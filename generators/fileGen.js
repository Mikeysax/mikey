var fs = require('fs-extra');
var _ = require('lodash');
var importGen = require('./importGen.js');
var importDefaults = require('./defaultGen.js');
var generateTest = require('./testGen.js');
var colors = require('colors');

var generateFile = function(foundPath, fileType, fileName, inpm, directory, defaults, currentWDir) {
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

      importGen(fileType, filePath, inpm, directory, currentWDir);
      importDefaults(defaults, filePath, fileType, directory, currentWDir);
      generateTest(filePath, fileType, fileName, directory);

      console.log('Successfuly created ' + colors.yellow(fileName + '.js') + ' in ' + colors.yellow(filePath.toString()));
    } else {
      console.log(colors.yellow(fileName + '.js') + colors.red(' already exists in this project.'));
    }
  });
};

module.exports = generateFile;
