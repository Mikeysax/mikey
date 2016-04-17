var fs = require('fs');
var _ = require('lodash');
var importDep = require('./importGen.js');

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

  importDep.importDep(componentPath, inpm);
  console.log('Successfuly created ' + component + '.js at ' + componentPath);
};

module.exports.generateComponent = generateComponent;
