var _ = require('lodash');
var prependFile = require('prepend-file');

var importDep = function(path, inpm) {
  if (inpm) {
    var importArray = [];
    inpm.forEach(function(i) {
      if (i.match(/,/)) {
        var splitDep = i.split(',');
        var impSplit = "import " + splitDep[0] + " from " + "'" + splitDep[1] + "';";
        importArray.push(impSplit + "\n");
        console.log("Adding: " + impSplit);
      } else if (i.match(/{|}/g)) {
        var removedCurl = i.replace(/{|}/g, '');
        var impMatch = "import " + i + " from " + "'" + removedCurl + "';";
        importArray.push(impMatch + "\n");
        console.log("Adding: " + impMatch);
      } else {
        var imp = "import " + i + " from " + "'" + i + "';";
        importArray.push(imp + "\n");
        console.log("Adding: " + imp);
      }
    });
    var importLines = importArray.join('');
    prependFile(path, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
};

module.exports.importDep = importDep;
