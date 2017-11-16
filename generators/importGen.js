var fs = require('fs-extra');
var prependFile = require('prepend-file');
var colors = require('colors');
var installDep = require('./installDep');

var importGen = function(fileType, filePath, inpm, directory, currentWDir) {
  if (inpm) {
    var defaultPath = directory + '/defaults/' + fileType + 'Default.js';
    var defaultFileData = fs.readFileSync(defaultPath, "utf8");
    var newDefaultArray = [];
    var importArray = [];

    var checkIfDefault = function(i) {
      if (defaultFileData.indexOf(i) == -1) {
        newDefaultArray.push(i + "\n");
      }
    };

    inpm.forEach(function(dependency) {
      var importStatement;
      if (dependency.match(/,/)) {
        var splitDep = dependency.split(',');
        importStatement = "import " + splitDep[0] + " from " + "'" + splitDep[1] + "';";
        dependency = splitDep[1];
      } else if (i.match(/{|}/g)) {
        var removedCurl = dependency.replace(/{|}/g, '');
        importStatement = "import " + dependency + " from " + "'" + removedCurl + "';";
        dependency = removedCurl;
      } else {
        importStatement = "import " + dependency + " from " + "'" + dependency + "';";
      }

      importArray.push(importStatement + "\n");
      console.log(colors.green("Adding: ") + importStatement);
      checkIfDefault(importStatement);
      installDep(dependency, currentWDir, directory);
    });

    var importLines = importArray.join('');
    prependFile(filePath, importLines, function(err) {
      if (err) console.log(err);
    });

    var defaultLines = newDefaultArray.join('');
    prependFile(defaultPath, defaultLines, function(err) {
      if (err) console.log(err);
    });
  }
};

module.exports = importGen;
