var fs = require('fs-extra');
var prependFile = require('prepend-file');

var importGen = function(fileType, filePath, inpm, directory) {
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

    inpm.forEach(function(i) {
      if (i.match(/,/)) {
        var splitDep = i.split(',');
        var impSplit = "import " + splitDep[0] + " from " + "'" + splitDep[1] + "';";
        importArray.push(impSplit + "\n");
        console.log("Adding: " + impSplit);
        checkIfDefault(impSplit);
      } else if (i.match(/{|}/g)) {
        var removedCurl = i.replace(/{|}/g, '');
        var impRemovedCurl = "import " + i + " from " + "'" + removedCurl + "';";
        importArray.push(impRemovedCurl + "\n");
        console.log("Adding: " + impRemovedCurl);
        checkIfDefault(impRemovedCurl);
      } else {
        var imp = "import " + i + " from " + "'" + i + "';";
        importArray.push(imp + "\n");
        console.log("Adding: " + imp);
        checkIfDefault(imp);
      }
    });

    var importLines = importArray.join('');
    prependFile(filePath, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
    var defaultLines = newDefaultArray.join('');
    prependFile(defaultPath, defaultLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};

module.exports.importGen = importGen;
