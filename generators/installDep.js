var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var _ = require('lodash');
var colors = require('colors');

var installDep = function(depName, currentWDir, directory) {
  var packageJSON = require(currentWDir + '/package.json');
  if (packageJSON) {
    if (checkIfInstalled(depName, packageJSON) === false) {
      console.log(colors.bold('Running ' + colors.yellow('yarn add') + ' for ' + colors.green(depName)));

      var yarnLocation = directory + '/node_modules/.bin/yarn';
      var newProject = spawn(yarnLocation, ['add', depName], { cwd: currentWDir, stdio: 'inherit' });

      newProject.on('close', function (exitCode) {
        console.log(colors.bold('Added ') + colors.green(depName));
      });
    } else {
      console.log(colors.red(depName) + colors.bold(' is installed in this project.'));
    }
  } else {
    console.log('Your package.json cannot be found.');
  }
};

var checkIfInstalled = function(depName, packageJSON) {
  if (packageJSON.dependencies[depName.toString()] === undefined) {
    return false;
  } else {
    return true;
  }
};

module.exports = installDep
