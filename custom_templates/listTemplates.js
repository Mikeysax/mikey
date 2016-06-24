var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');

var listTemplates = function(fileType, filePathToFileType) {
  console.log(colors.red(_.capitalize(fileType) + ' Template List:'));
  // Path to Custom Template Folder

  fs.readdir(filePathToFileType, function(err, items) {
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
  });
};

module.exports.listTemplates = listTemplates;
