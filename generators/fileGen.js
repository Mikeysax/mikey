var fs = require('fs-extra');
var _ = require('lodash');
var gImport = require('./importGen.js');
var gDefaults = require('./defaultGen.js');
var tGen = require('./testGen.js');
var colors = require('colors');

var generateFile = function(foundPath, fileType, fileName, inpm, directory, defaults) {
  var readTemplate = fs.createReadStream(directory + '/file_templates/' + fileType + 'Template.js');
  var filePath = './' + foundPath + '/' + fileName + '.js';
  
  fs.stat(filePath, function(err, stats) {
    if (stats === undefined) {
      var writeFile = fs.createWriteStream(filePath);

      readTemplate.on('data', function(chunk) {
        var newData = chunk.toString()
          .replace(/__Name__/g, fileName);

        writeFile.write(newData);
        writeFile.end();
      });

      readTemplate.on('end', function(error) {
        if (error) { console.log(colors.red(error.toString())); }
      });

      gImport.importGen(fileType, filePath, inpm, directory);
      gDefaults.importDefaults(defaults, filePath, fileType, directory);
      tGen.generateTest(filePath, fileType, fileName, directory);

      console.log('Successfuly created ' + colors.yellow(fileName + '.js') + ' in ' + colors.yellow(filePath.toString()));
    } else {
      console.log(colors.yellow(fileName + '.js') + colors.red(' already exists in this project.'));
    }
  });
};

module.exports.generateFile = generateFile;
