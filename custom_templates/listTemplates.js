var fs = require('fs-extra');
var _ = require('lodash');
var colors = require('colors');

var listTemplates = function(fileType, filePathToFileType) {
  console.log(colors.red(_.capitalize(fileType) + ' Template List:\n'));
  // Path to Custom Template Folder

  fs.readdir(filePathToFileType, function(err, items) {
    if (items.length <= 1) {
      return(
        console.log(' - No Templates Available.\n___________________')
      );
    }
    for (var i=0; i<items.length; i++) {
      if (items[i] !== '.gitkeep') {
        console.log(' - ' + items[i]);
      }
    }
    console.log('___________________');
  });
};

module.exports = listTemplates;
