var fs = require('fs-extra');
var spawn = require('child_process').spawn;
var colors = require('colors');

var generateProject = function(projectName, currentWDir, directory, projectType, api) {
  var projectDestination = currentWDir + '/' + projectName;
  fs.mkdirs(projectDestination, function(err) {
    if (err) { console.log(err); }
  });

  // Universal, Electron, or Regular?
  var projectTemplate = '';
  var projectStart = '';
  if (projectType === 'redux') {
    projectTemplate = '/project_template';
    projectStart = 'npm start';
  }
  if (projectType === 'react') {
    projectTemplate = '/project_react_template';
    projectStart = 'npm start';
  }
  if (projectType === 'universal') {
    if (api === true || api === 'Y' || api === 'y') {
      projectTemplate = '/universal_api_project_template';
      projectStart = 'npm run dev';
    } else {
      projectTemplate = '/universal_project_template';
      projectStart = 'npm run dev';
    }
  }
  if (projectType === 'electron') {
    projectTemplate = '/electron_project_template';
    projectStart = 'npm run dev';
  }

  fs.copy(directory + projectTemplate, projectDestination, function(err) {
    if (err) { console.log(err); }
  })

  console.log(colors.bold('Running yarn install: '));

  var yarnLocation = directory + '/node_modules/.bin/yarn';

  var newProject = spawn(yarnLocation, ['install'], { cwd: projectDestination, stdio: 'inherit' });

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

module.exports = generateProject;
