var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');

var saveTemplate = function(filePath, fileType, fileName, directory) {
  // Read file in current project from fileType / fileName
  var readFileForSave = fs.createReadStream(filePath + '/' + fileName + '.js');
  // Path to custom_templates / fileType folder
  var filePathToSave = directory + '/custom_templates/' + fileType + '/' + fileName + '.js';
  // Does it exist as a template already?
  fs.stat(filePathToSave, function(err, stats) {
    if (stats === undefined) {
      // Write to custom_templates to save template
      var writeFile = fs.createWriteStream(filePathToSave);

      readFileForSave.on('data', function(chunk) {
        writeFile.write(chunk);
        writeFile.end();
      });

      readFileForSave.on('end', function(error) {
        if (error) { console.log(colors.red(error.toString())); }
      });
      // Success
      console.log(colors.yellow(_.capitalize(fileType).toString()) + ': ' + fileName + '.js Custom Template ' + colors.green('Saved Successfully'));
    } else {
      // File Exists
      console.log(colors.yellow(fileName + '.js') + colors.red(' already exists as saved custom template.'));
    }
  });
};

module.exports = saveTemplate;
