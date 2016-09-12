var fs = require('fs-extra');
var install = require('spawn-npm-install');
var _ = require('lodash');
var colors = require('colors');

var installDep = function(depName, currentWDir) {
  var packageJSON = require(currentWDir + '/package.json');
  if (packageJSON) {
    if (checkIfInstalled(depName, packageJSON) === false) {
      console.log(colors.bold('Running ' + colors.yellow('npm install') + ' for ' + colors.green(depName)));
      install(depName, { save: true, stdio: 'inherit' });
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
