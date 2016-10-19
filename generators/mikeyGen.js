var fs = require('fs-extra');
var prependFile = require('prepend-file');
var colors = require('colors');

var mikeyJsonGenerator = function(currentWDir) {

  var mikeyJsonPathFile = currentWDir + '/mikey.json';
  var mikeyJsonData = {
    css: true,
    cssFolder: 'css',
    cssExtension: 'scss',
    testing: true
  }

  fs.stat(mikeyJsonPathFile, function(err, stats) {
    if (stats === undefined) {
      fs.outputJson(mikeyJsonPathFile, mikeyJsonData, function(error) {
        if (error) { console.log(error); }
        console.log('Creating: ' + colors.green('mikey.json') + ' in root for ' + colors.yellow('style and test settings') + '.');
      });
    }
  });

  var gitIgnorePath = currentWDir + '/.gitignore';
  fs.access(gitIgnorePath, fs.F_OK, function(error) {
    if (error) {
      console.log('Adding: ' + colors.green('mikey.json') + ' to ' + colors.green('.gitignore') + ' but ' + colors.red('file does not exist.'));
    } else {
      var gitIgnoreFile = fs.readFileSync(gitIgnorePath, 'utf8');
      if (!gitIgnoreFile.match(/mikey.json/)) {
        prependFile(gitIgnorePath, 'mikey.json\n', function(error) {
          if (error) { console.log(error); }
        });
      }
    }
  });
};

module.exports = mikeyJsonGenerator;
