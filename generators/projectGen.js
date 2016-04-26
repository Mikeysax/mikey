var fs = require('fs-extra');
var exec = require('child_process').exec;

var generateProject = function(projectName, currentWDir, directory) {
  var projectDestination = currentWDir + '/' + projectName;
  fs.mkdirs(projectDestination, function(err) {
    if (err) { console.log(err); }
  });
  fs.copy(directory + '/project_template', projectDestination, function(err) {
    if (err) { console.log(err); }
  })

  var npm = 'npm install';
  var rbNodeSass = 'npm rebuild node-sass';

  console.log('Running npm install, please be patient...this is not frozen.')
  exec(npm, { cwd: projectDestination }, function(error, stdout, stderr) {
    if (error) {
      console.log('Still running npm install, almost done!');
      exec(rbNodeSass, { cwd: projectDestination }, function(error, stdout, stderr) {
        if (error) { console.log('error'); }
        console.log('Almost, I promise! <3')
        exec(npm, { cwd: projectDestination }, function(error, stdout, stderr) {
          if (error) { console.log(error); }
          console.log('Done! cd to ' + projectName + ' and launch server:');
          console.log('webpack-dev-server --inline --hot --watch-poll');
          console.log('or for vagrant:');
          console.log('webpack-dev-server --inline --hot --host 0.0.0.0 --watch-poll');
        });
      });
    }
  });
};

module.exports.generateProject = generateProject;
