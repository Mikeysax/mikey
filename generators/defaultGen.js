var fs = require('fs-extra');
var prependFile = require('prepend-file');
var colors = require('colors');
var installDep = require('./installDep');

var importDefaults = function(defaults, filePath, fileType, directory, currentWDir) {
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

    fileDefaults.match(/'(.*?)'/g).forEach(function(w) {
      installDep(w.replace(/'/g, ''), currentWDir);
    });
  }
};

module.exports = importDefaults;
