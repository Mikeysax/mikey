var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');
var generatePath = require('./pathGen.js');

var generateCSS = function(fileName, fileType, currentWDir) {
  if (fileType === 'container' || fileType === 'component') {
    var projectsMikeyJson = require(`${currentWDir}/mikey.json`);
    if (projectsMikeyJson.css === true) {

      var cssFileName = _.snakeCase(fileName);
      var cssFolderPath = generatePath(projectsMikeyJson.cssFolder, currentWDir);
      var cssFilePath = './' + cssFolderPath + '/' + cssFileName + '.' + projectsMikeyJson.cssExtension;

      fs.stat(cssFilePath, function(err, stats) {
        if (stats === undefined) {
          fs.writeFileSync(cssFilePath.toString(), '');
          console.log('Successfuly created ' + colors.yellow(cssFileName + '.' + projectsMikeyJson.cssExtension) + ' in ' + colors.yellow(cssFilePath.toString()));
        } else {
          console.log(colors.yellow(cssFileName + '.' + projectsMikeyJson.cssExtension) + colors.red(' already exists in this project.'));
        }
      });
    }
  }
};

module.exports = generateCSS;
