var fs = require('fs-extra');
var prependFile = require('prepend-file');
var colors = require('colors');

var importDefaults = function(defaults, filePath, fileType, directory) {
  if (defaults.match(/n/)) {
    console.log('Defaults:' + colors.red(' No'));
  }
  if (defaults.match(/Y/)) {
    console.log('Defaults: ' + colors.green('Yes'));
    var defaultPath = directory + '/defaults/' + fileType + 'Default.js';
    var loadedFileDefaults = fs.readFileSync(defaultPath, 'utf8', function(err) {
      if (err) {
        console.log(err);
      }
    });

    var fileDefaults = loadedFileDefaults.replace(/\[object Object\]/g, '');
    prependFile(filePath, fileDefaults, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};

module.exports.importDefaults = importDefaults;
