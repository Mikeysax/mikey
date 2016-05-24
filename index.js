#!/usr/bin/env node
var program = require('commander');
var gPath = require('./generators/pathGen.js');
var gProject = require('./generators/projectGen.js');
var gFile = require('./generators/fileGen.js');
var eDefaults = require('./defaults/eraseDefaults.js');
var lDefaults = require('./defaults/listDefaults.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}
program
  .version('1.1.3')
  .option('new <projectName>', 'Generate New React-Redux Project.')
  .option('g container <containerName>', 'Generate Container file.')
  .option('g component <componentName>', 'Generate Component file.')
  .option('g action <actionName>', 'Generate action file.')
  .option('g reducer <reducerName>', 'Generate reducer file.')
  .option('g helper <helperName>', 'Generate helper file.')
  .option('-i, import [importName]', '(Optional) Add import to file.', collect, [])
  .option('-d, defaults [defaults]', '(Optional) Import previous dependencies for file type. No if blank.(n, Y)', /^(Y|n)$/i, 'n')
  .option('-l, list [list]', 'List defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('-e, erase [erase]', 'Erase defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .parse(process.argv);

var directory = __dirname;
var inpm = program.importName;
var defaults = program.defaults;
var currentWDir = process.cwd();

if (typeof program.projectName != 'undefined') {
  var projectName = program.projectName;
  console.log('Generating New Project: ' + projectName + ' in ' + currentWDir);
  gProject.generateProject(projectName, currentWDir, directory);
}
if (typeof program.componentName != 'undefined') {
  var componentType = 'component';
  var componentName = program.componentName;
  var componentFolderPath = gPath.generatePath('components', currentWDir);
  console.log('Generating Component File: ' + componentName + '.js');
  gFile.generateFile(componentFolderPath, componentType, componentName, inpm, directory, defaults);
}
if (typeof program.containerName != 'undefined') {
  var containerType = 'container';
  var containerName = program.containerName;
  var containerFolderPath = gPath.generatePath('containers', currentWDir);
  console.log('Generating Container File: ' + containerName + '.js');
  gFile.generateFile(containerFolderPath, containerType, containerName, inpm, directory, defaults);
}
if (typeof program.actionName != 'undefined') {
  var actionType = 'action';
  var actionName = program.actionName;
  var actionsFolderPath = gPath.generatePath('actions', currentWDir);
  console.log('Generating Action File: ' + actionName + '.js');
  gFile.generateFile(actionsFolderPath, actionType, actionName, inpm, directory, defaults);
}
if (typeof program.reducerName != 'undefined') {
  var reducerType = 'reducer';
  var reducerName = program.reducerName;
  var reducersFolderPath = gPath.generatePath('reducers', currentWDir);
  console.log('Generating Reducer File: ' + reducerName + '.js');
  gFile.generateFile(reducersFolderPath, reducerType, reducerName, inpm, directory, defaults);
}
if (typeof program.helperName != 'undefined') {
  var helperType = 'helper';
  var helperName = program.helperName;
  var helpersFolderPath = gPath.generatePath('helpers', currentWDir);
  console.log('Generating Helper File: ' + helperName + '.js');
  gFile.generateFile(helpersFolderPath, helperType, helperName, inpm, directory, defaults);
}
if (typeof program.erase != 'undefined') {
  eDefaults.eraseDefaults(program.erase, directory);
}
if (typeof program.list != 'undefined') {
  lDefaults.listDefaults(program.list, directory);
}
