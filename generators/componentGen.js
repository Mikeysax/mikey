var fs = require('fs');
var _ = require('lodash');
var prependFile = require('prepend-file');

var generateComponent = function(component, inpm, directory) {
  var readComponentTemplate = fs.createReadStream(directory + '/templates/componentTemplate.js');
  var componentPath = './src/js/components/' + component + '.js';
  var writeComponentFile = fs.createWriteStream(componentPath);

  readComponentTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/CnameC/g, component);
    writeComponentFile.write(newData);
    writeComponentFile.end();
  });

  readComponentTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Component Template Used Successfully')
  });

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
    prependFile(componentPath, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  console.log('Successfuly created ' + component + '.js');
};

module.exports.generateComponent = generateComponent;
