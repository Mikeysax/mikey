var fs = require('fs');
var _ = require('lodash');
var importDep = require('./importGen.js');

var generateContainer = function(container, inpm, directory) {
  var readContainerTemplate = fs.createReadStream(directory + '/templates/containerTemplate.js');
  var containerPath = './src/js/containers/' + container + '.js';
  var writeContainerFile = fs.createWriteStream(containerPath);

  readContainerTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/CnameC/g, container);
    writeContainerFile.write(newData);
    writeContainerFile.end();
  });

  readContainerTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Component Template Used Successfully')
  });

  importDep.importDep(containerPath, inpm);
  console.log('Successfuly created ' + container + '.js at ' + containerPath);
};

module.exports.generateContainer = generateContainer;
