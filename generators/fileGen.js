var fs = require('fs-extra');
var _ = require('lodash');
var gImport = require('./importGen.js');
var gDefaults = require('./defaultGen.js');

var generateFile = function(foundPath, fileType, fileName, inpm, directory, defaults) {
  var readTemplate = fs.createReadStream(directory + '/file_templates/' + fileType + 'Template.js');
  var filePath = './' + foundPath + '/' + fileName + '.js';
  var writeFile = fs.createWriteStream(filePath);

  readTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/CnameC/g, fileName);
    writeFile.write(newData);
    writeFile.end();
  });

  readTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log(_.capitalize(fileType) + ' Template Used Successfully')
  });

  gImport.importGen(fileType, filePath, inpm, directory);
  gDefaults.importDefaults(defaults, filePath, fileType, directory);

  console.log('Successfuly created ' + fileName + '.js in ' + filePath);
};

module.exports.generateFile = generateFile;
