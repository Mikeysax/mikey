var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');
var generatePath = require('./pathGen.js');

var generateCSS = function(fileName, fileType, currentWDir) {
  if (fileType === 'container' || fileType === 'component') {
    var cssFileName = _.snakeCase(fileName);
    var cssFolderPath = generatePath('css', currentWDir);
    var cssFilePath = './' + cssFolderPath + '/' + cssFileName + '.scss';
    fs.stat(cssFilePath, function(err, stats) {
      if (stats === undefined) {
        fs.writeFileSync(cssFilePath.toString(), '');
        console.log('Successfuly created ' + colors.yellow(cssFileName + '.scss') + ' in ' + colors.yellow(cssFilePath.toString()));
      } else {
        console.log(colors.yellow(cssFileName + '.scss') + colors.red(' already exists in this project.'));
      }
    });
  }
};

module.exports = generateCSS;
