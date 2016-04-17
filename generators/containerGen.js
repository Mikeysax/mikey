var fs = require('fs');
var _ = require('lodash');
var prependFile = require('prepend-file');

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

  if (inpm) {
    var importArray = [];
    inpm.forEach(function(i) {
      console.log('Adding: ' + i);
      if (i.match(/{|}/g)) {
        var removedCurl = i.replace(/{|}/g, '');
        importArray.push("import " + i + " from " + "'" + removedCurl + "';");
      } else {
        importArray.push("import " + i + " from " + "'" + i + "';");
      }
    });
    var importLines = importArray.join('');
    prependFile(containerPath, importLines, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  console.log('Successfuly created ' + container + '.js');
};

module.exports.generateContainer = generateContainer;
