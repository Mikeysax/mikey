var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');

var deleteTemplate = function(fileType, fileName, directory) {
  // Path to custom_templates / fileType folder
  var filePathToDelete = directory + '/custom_templates/' + fileType + '/' + fileName + '.js';
  // Does it exist?
  fs.stat(filePathToDelete, function(err, stats) {
    if (stats === undefined) {
      // File Does Not Exist
      console.log(_.capitalize(fileType) + ' ' + fileName  + colors.red(' Does Not Exist.'));
    } else {
      // File Exists
      fs.unlink(filePathToDelete)
      console.log(colors.yellow(fileName + '.js') + colors.red(' Custom Template Successfully Deleted.'));
    }
  });
};

module.exports = deleteTemplate;
