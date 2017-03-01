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

          // Auto Import to App.js
          // Every other projects App.js location
          var srcFolderPath = generatePath('src', currentWDir);
          var srcAppJsFilePath = './' + srcFolderPath + '/App.js';
          fs.stat(srcAppJsFilePath, function(err, stats) {
            if (stats === undefined) {
              // src doesnt exist so check if universal
              // Universal App.js location
              var clientFolderPath = generatePath('client', currentWDir);
              var clientAppJsFilePath = './' + clientFolderPath + '/App.js';
              fs.stat(clientAppJsFilePath, function(err, stats) {
                if (stats === undefined) {
                  console.log('Cannot find App.js to Auto Import Generated CSS file.')
                } else {
                  autoImportCSS(clientAppJsFilePath, cssFilePath, cssFileName, 'client', projectsMikeyJson)
                }
              });
            } else {
              autoImportCSS(srcAppJsFilePath, cssFilePath, cssFileName, 'src', projectsMikeyJson)
            }
          });
        } else {
          console.log(colors.yellow(cssFileName + '.' + projectsMikeyJson.cssExtension) + colors.red(' already exists in this project.'));
        }
      });
    }
  }
};

var autoImportCSS = function(filePath, cssFilePath, cssFileName, clientOrSrc, projectsMikeyJson) {
  var readFilePath = fs.readFileSync(filePath, 'utf8');
  var importRegex = new RegExp(cssFilePath.toString(), 'g');
  var newData = '';
  if (readFilePath.match(importRegex) === null) {
    var regExpCSS = new RegExp(`import.+\.${projectsMikeyJson.cssExtension}';\n`, 'm')
    var replaceText = readFilePath.match(regExpCSS);
    if (clientOrSrc === 'client') {
      newData = readFilePath.replace(regExpCSS, `${replaceText}import '.${cssFilePath}';\n` );
    } else {
      var cssLocation = cssFilePath.replace(/([^\/]*\/){2}/, './');
      newData = readFilePath.replace(regExpCSS, `${replaceText}import '${cssLocation}';\n` );
    }
    fs.writeFileSync(filePath, newData, 'utf8');
    console.log('Successfuly imported ' + colors.yellow(cssFileName + '.' + projectsMikeyJson.cssExtension) + ' in ' + colors.yellow(filePath.toString()));
  }
};

module.exports = generateCSS;
