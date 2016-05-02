var fs = require('fs-extra');
var prependFile = require('prepend-file');
var gPath = require('./pathGen.js');
var mAppJs = require('./user_auth_mods/appJsModifier.js');
var mRouteJs = require('./user_auth_mods/routeJsModifier.js');

var generateUserAuth = function(currentWDir, directory) {
  var containersPath = gPath.generatePath('containers', currentWDir);
  fs.stat(containersPath + '/SignUp.js', function(err, stats) {
    if (stats === undefined) {
      // var folderArray = ['actions', 'components', 'containers', 'helpers', 'reducers'];
      //
      // folderArray.forEach(function(folder) {
      //   var authFolderPath = gPath.generatePath(folder, currentWDir);
      //   fs.copy(directory + '/user_auth_template/' + folder, authFolderPath.toString(), function(err) {
      //     if (err) { console.log(err); }
      //   })
      // });

      // Insert import App.js information
      mAppJs.appJsModifier(currentWDir, directory);
      // Insert import Route.js information
      // mRouteJs.routeJsModifier(currentWDir, directory);
    } else {
      console.log('User Auth Was Already Added To This Project')
    }
  });
};

module.exports.generateUserAuth = generateUserAuth;
