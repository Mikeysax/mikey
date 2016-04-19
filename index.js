#!/usr/bin/env node
var program = require('commander');
var ff = require('node-find-folder');
var gProject = require('./generators/projectGen.js')
var gFile = require('./generators/fileGen.js');
var eDefaults = require('./defaults/eraseDefaults.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}
program
  .version('0.5.1')
  .option('new <new>', 'Generate New React-Redux Project.')
  .option('componentCreator <componentCreator>', 'Generate React component js file.')
  .option('containerCreator <containerCreator>', 'Generate React-Redux container js file.')
  .option('actionCreator <actionCreator>', 'Generate React action js file.')
  .option('-i, importNpm [importNpm]', '(Optional) Import npm packages into file. Enter with {} if needed.', collect, [])
  .option('-d, defaults [defaults]', 'Import previous dependencies for file type. No if blank.(No, Yes)', /^(yes|no)$/i, 'no')
  .option('-e, erase [erase]', 'Erase defaults: actions/containers/components/all', /^(actions|components|containers|all)$/i, 'nothing')
  .parse(process.argv);

var directory = __dirname;
var inpm = program.importNpm;
var defaults = program.defaults;

if (typeof program.new != 'undefined') {
  var projectName = program.new;
  var currentWDir = process.cwd();
  console.log('Generating New Project: ' + projectName + ' in ' + currentWDir);
  gProject.generateProject(projectName, currentWDir, directory);
}
if (typeof program.componentCreator != 'undefined') {
  var componentType = 'component';
  var componentFolderPath = new ff('components', {nottraversal: ['test']});
  var componentName = program.componentCreator;
  console.log('Generating Component File: ' + componentName + '.js');
  gFile.generateFile(componentFolderPath, componentType, componentName, inpm, directory, defaults);
}
if (typeof program.containerCreator != 'undefined') {
  var containerType = 'container';
  var containerFolderPath = new ff('containers', {nottraversal: ['test']});
  var containerName = program.containerCreator;
  console.log('Generating Container File: ' + containerName + '.js');
  gFile.generateFile(containerFolderPath, containerType, containerName, inpm, directory, defaults);
}
if (typeof program.actionCreator != 'undefined') {
  var actionType = 'action';
  var actionsFolderPath = new ff('actions', {nottraversal: ['test']});
  var actionName = program.actionCreator;
  console.log('Generating Action File: ' + actionName + '.js');
  gFile.generateFile(actionsFolderPath, actionType, actionName, inpm, directory, defaults);
}
if (typeof program.erase != 'undefined') {
  eDefaults.eraseDefaults(program.erase, directory);
}
