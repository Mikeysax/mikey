var fs = require('fs');
var _ = require('lodash');
var importDep = require('./importGen.js');

var generateAction = function(action, inpm, directory) {
  var readActionTemplate = fs.createReadStream(directory + '/templates/actionTemplate.js');
  var actionPath = './src/js/actions/' + action + '.js';
  var writeActionFile = fs.createWriteStream(actionPath);

  readActionTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/CnameC/g, action);
    writeActionFile.write(newData);
    writeActionFile.end();
  });

  readActionTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Action Template Used Successfully')
  });

  importDep.importDep(actionPath, inpm);
  console.log('Successfuly created ' + action + '.js at ' + actionPath);
};

module.exports.generateAction = generateAction;
