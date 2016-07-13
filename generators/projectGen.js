var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var colors = require('colors');

var generateProject = function(projectName, currentWDir, directory, universal) {
  var projectDestination = currentWDir + '/' + projectName;
  fs.mkdirs(projectDestination, function(err) {
    if (err) { console.log(err); }
  });

  // Universal or Regular?
  var projectTemplate = '';
  var projectStart = '';
  if (universal === false) {
    projectTemplate = '/project_template';
    projectStart = 'npm start';
  }
  if (universal === true) {
    projectTemplate = '/universal_project_template';
    projectStart = 'npm run dev';
  }

  fs.copy(directory + projectTemplate, projectDestination, function(err) {
    if (err) { console.log(err); }
  })

  console.log(colors.bold('Running npm install: '));

  var newProject = spawn('npm', ['install'], { cwd: projectDestination, stdio: 'inherit' });

  newProject.on('close', function (exitCode) {
    console.log(colors.bold('Done! cd to ') + colors.yellow.bold(projectName.toString()) + colors.bold(' and launch server: ') + colors.bold.green(projectStart.toString()));
    console.log(colors.rainbow('   ███╗   ███╗██╗██╗  ██╗███████╗██╗   ██╗'));
    console.log(colors.rainbow('   ████╗ ████║██║██║ ██╔╝██╔════╝╚██╗ ██╔╝'));
    console.log(colors.rainbow('   ██╔████╔██║██║█████╔╝ █████╗   ╚████╔╝'));
    console.log(colors.rainbow('   ██║╚██╔╝██║██║██╔═██╗ ██╔══╝    ╚██╔╝'));
    console.log(colors.rainbow('   ██║ ╚═╝ ██║██║██║  ██╗███████╗   ██║'));
    console.log(colors.rainbow('   ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝'));
  });
};

module.exports.generateProject = generateProject;
