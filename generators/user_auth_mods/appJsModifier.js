var fs = require('fs-extra');
var gPath = require('../pathGen.js');

var appJsModifier = function(currentWDir, directory) {
  var appJSPath = gPath.generatePath('App.js', currentWDir);
  var projectReducerPath = gPath.generatePath('reducers', currentWDir);
  var projectHelperPath = gPath.generatePath('helpers', currentWDir);

  var readProjectAppJSFile = fs.readFileSync(appJSPath, 'utf8');
  //Check if User Auth was already added.
  if (readProjectAppJSFile.match(/currentUser|syncCurrentUserFromLocalStorage|createUserSubscriber/g) === null) {
    var projectAppFileImportArray = readProjectAppJSFile.match(/import.+?;/g);

    var readAppImportTemplate = fs.readFileSync(directory + '/user_auth_template/app/appImports.js', 'utf8');
    var appImportTemplateArray = readAppImportTemplate.match(/import.+?;/g);
    //Changes import url to directory url and pushes to one array.
    appImportTemplateArray.forEach(function(i) {
      var newImp = undefined;
      if (i.match(/CreducerC/g)) {
        newImp = i.replace(/CreducerC/g, projectReducerPath);
      }
      if (i.match(/ChelperC/g)) {
        newImp = i.replace(/ChelperC/g, projectHelperPath);
      }
      projectAppFileImportArray.push(newImp);
    });
    var newAppImportData = projectAppFileImportArray.join('\n');
    var appRemoveData = readProjectAppJSFile.replace(/import.+?;\n/g, '');
    //Joins new import data and the rest of the App.JS File
    var newAppJsData = [newAppImportData, appRemoveData].join();
    fs.writeFile(appJSPath, newAppJsData, function(err) {
      if (err) { console.log(err); }
    });

    var appReducerConst = readProjectAppJSFile.match(/const reduxApp = combineReducers.+?\n/g);
    var currentUser = fs.readFileSync(directory + '/user_auth_template/app/currentUserReducerApp.js', 'utf8');
    var addCurrentUser = appReducerConst + currentUser;

    var readStoreRender = readProjectAppJSFile.match(/store.subscribe.+?\n/g);
    var localStorage = fs.readFileSync(directory + '/user_auth_template/app/App.js', 'utf8');
    var addLocalStorage = readStoreRender.join('\n') + localStorage;
    //Adds Current User data to reduxApp
    fs.readFile(appJSPath, 'utf8', function (err, data) {
      if (err) { return console.log(err); }
      var replaceAndAddCurrentUser = data.replace(/const reduxApp = combineReducers.+/g, addCurrentUser);
      fs.writeFile(appJSPath, replaceAndAddCurrentUser, 'utf8', function (err) {
         if (err) { return console.log(err); }
         fs.readFile(appJSPath, 'utf8', function (err, data) {
           // Adds localStorage data under store.subscription
           if (err) { return console.log(err); }
           var replaceAndAddLocalStorage = data.replace(/store.subscribe.+/g, addLocalStorage);
           fs.writeFile(appJSPath, replaceAndAddLocalStorage, 'utf8', function (err) {
              if (err) { return console.log(err); }
              console.log('App.js modified in ' + appJSPath + ' path for User Auth.');
           });
         });
      });
    });
  };
};

module.exports.appJsModifier = appJsModifier;
