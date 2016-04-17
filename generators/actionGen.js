var fs = require('fs');
var _ = require('lodash');
var prependFile = require('prepend-file');

var generateAction = function(action, inpm, directory) {
  var readActionTemplate = fs.createReadStream(directory + '/templates/actionTemplate.js');
  var actionPath = './src/js/actions/' + action + '.js';
  var writeActionFile = fs.createWriteStream(actionPath);

  readActionTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, action);
    writeActionFile.write(newData);
    writeActionFile.end();
  });

  readActionTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Action Template Used Successfully')
  });

  if (inpm) {
    var importArray = [];
    inpm.forEach(function(i) {
      importArray.push("import " + i + " from " + "'" + i + "';");
      console.log('Adding: ' + i);
    });
    var importLines = importArray.join('\n');
    prependFile(actionPath, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  console.log('Successfuly created ' + action + '.js');
};

module.exports.generateAction = generateAction;
