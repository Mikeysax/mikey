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
      importArray.push("import " + i + " from " + "'" + i + "';");
      console.log('Adding: ' + i);
    });
    var importLines = importArray.join('\n');
    prependFile(componentPath, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  console.log('Successfuly created ' + component + '.js');
};

module.exports.generateComponent = generateComponent;
