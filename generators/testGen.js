var fs = require('fs-extra');
var ff = require('node-find-folder');
var _ = require('lodash');

var generateTest = function(filePath, fileType, fileName, directory) {
  // Find Testing Folder and Correct Folder with File Type
  var pluralFileType = fileType + 's';
  var foundTestPath = new ff(pluralFileType, {nottraversal: ['src', 'js', 'project_template', 'node_modules', 'user_auth_template']});
  // Read Test Template
  var readTemplate = fs.createReadStream(directory + '/file_templates/testTemplate.js');
  // Test Path with File Type
  var testPath = './' + foundTestPath + '/' + fileName + '.test.js';

  // Check if Test File Exists
  fs.stat(testPath, function(err, stats) {
    if (stats === undefined) {
      var writeFile = fs.createWriteStream(testPath);

      // Replace Data Inside Template and Write to Test File
      readTemplate.on('data', function(chunk) {
        // Removed .js from filePath for Importing
        var filePathRemoveJsAffix = filePath.slice(0, -3);
        var replaceData = chunk.toString()
          .replace(/__Name__/g, fileName)
          .replace(/__Path__/g, '../.' + filePathRemoveJsAffix)
          .replace(/__FileType__/g, _.capitalize(fileType));

        writeFile.write(replaceData);
        writeFile.end();
      });

      readTemplate.on('end', function(error) {
        if (error) {
          console.log(error);
        }
        console.log('Test Created')
      });

    } else {
      console.log('Test Already Exists');
    }
  });
};

module.exports.generateTest = generateTest;
