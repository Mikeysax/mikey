var fs = require('fs-extra');
var gPath = require('../pathGen.js');

var routeJsModifier = function(currentWDir, directory) {
  var configFolderPath = gPath.generatePath('config', currentWDir);
  var projectRouteJsPath = configFolderPath + '/routes.js';
  var projectRouteJsFile = fs.readFileSync(projectRouteJsPath, 'utf8');
  
  //Check if User Auth was already added.
  if (projectRouteJsFile.match(/SignUp|SignIn/g) === null) {
    var projectRouteFileImportArray = projectRouteJsFile.match(/import.+?;/g);

    var readRouteImportTemplate = fs.readFileSync(directory + '/user_auth_template/config/routeImports.js', 'utf8');
    var routeImportTemplateArray = readRouteImportTemplate.match(/import.+?;/g);

    routeImportTemplateArray.forEach(function(i) {
      projectRouteFileImportArray.push(i);
    });
    var projectRouteFileJoined = projectRouteFileImportArray.join('\n');
    var removeProjectRouteImports = projectRouteJsFile.replace(/import.+?;\n/g, '');
    //Join new imports to Project Route Body.
    var newProjectRouteImportFile = [projectRouteFileJoined, removeProjectRouteImports].join('\n');
    //Writes new imports to project Route.js file
    fs.writeFile(projectRouteJsPath, newProjectRouteImportFile, function(err) {
      if (err) { console.log(err); }
    });

    //Combine project routes with auth routes
    var innerProjectRouteArray = projectRouteJsFile.match(/<Route path=.+?}>/g);
    var readAuthRoutes = fs.readFileSync(directory + '/user_auth_template/config/routes.js', 'utf8');
    var authRoutesArray = readAuthRoutes.match(/    <Route path=.+?\/>/g);
    authRoutesArray.forEach(function(i) {
      innerProjectRouteArray.push(i);
    });
    var newRouteData = innerProjectRouteArray.join('\n');

    //Read route.js file again and write routes
    fs.readFile(projectRouteJsPath, 'utf8', function (err, data) {
      if (err) { return console.log(err); }
      var replaceRoutes = data.replace(/<Route path=.+?}>/g, newRouteData);
      fs.writeFile(projectRouteJsPath, replaceRoutes, 'utf8', function (err) {
        if (err) { return console.log(err); }
        console.log('route.js modified in ' + projectRouteJsPath + ' path for User Auth.');
      });
    });
  }
};

module.exports.routeJsModifier = routeJsModifier;
