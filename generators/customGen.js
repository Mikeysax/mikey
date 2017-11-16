var fs = require('fs-extra');
var capitalize = require('lodash/capitalize');
var importGen = require('./importGen.js');
var importDefaults = require('./defaultGen.js');
var generateTest = require('./testGen.js');
var colors = require('colors');

var generateCustomFile = function(foundPath, fileType, templateName, fileName, inpm, directory, currentWDir) {
  var readTemplate = fs.createReadStream(directory + '/custom_templates/' + fileType + '/' + templateName + '.js');
  var filePath = './' + foundPath + '/' + fileName + '.js';

  // Use template name if filename is not defined.
  if (fileName.length < 2) {
    fileName = templateName;
  }

  fs.stat(filePath, function(err, stats) {
    if (stats === undefined) {
      var writeFile = fs.createWriteStream(filePath);
      var regExTemplateName = new RegExp(templateName, 'g');

      readTemplate.on('data', function(chunk) {
        var newData = chunk.toString()
          .replace(regExTemplateName, fileName);

        writeFile.write(newData);
        writeFile.end();
      });

      readTemplate.on('end', function(error) {
        if (error) console.log(colors.red(error.toString()));
        console.log(colors.yellow(capitalize(fileType).toString()) + '/' + templateName + ' Custom Template Used Successfully');
      });

      importGen(fileType, filePath, inpm, directory, currentWDir);
      importDefaults(defaults, filePath, fileType, directory);
      generateTest(filePath, fileType, fileName, directory);

      console.log('Successfuly created ' + colors.yellow(fileName + '.js') + ' in ' + colors.yellow(filePath.toString()));
    } else {
      console.log(colors.yellow(fileName + '.js') + colors.red(' already exists in this project.'));
    }
  });
};

module.exports = generateCustomFile;
