var fs = require('fs-extra');
var _ = require('lodash');

var generateProject = function(projectName, currentWDir, directory) {
  fs.mkdirs(currentWDir + '/' + projectName, function(err) {
    if (err) { console.log(err); }
  });
  var projectPath = './' + projectName;
  fs.copy(directory + '/project_template', projectPath, function(err) {
    if (err) { console.log(err); }
  })
};

module.exports.generateProject = generateProject;
