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
  .version('1.1.7')
  .option('new <projectName>', 'Generate New React-Redux Project.')
  .option('g_container <containerName>', 'Generate Container file.')
  .option('g_component <componentName>', 'Generate Component file.')
  .option('g_action <actionName>', 'Generate action file.')
  .option('g_reducer <reducerName>', 'Generate reducer file.')
  .option('g_helper <helperName>', 'Generate helper file.')
  .option('-i, import [importName]', '(Optional) Add import to file.', collect, [])
  .option('-d, defaults [defaults]', '(Optional) Import previous dependencies for file type. No if blank.(n, Y)', /^(Y|n)$/i, 'n')
  .option('-l, list [list]', 'List defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('-e, erase [erase]', 'Erase defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .parse(process.argv);

var directory = __dirname;
var inpm = program.importName;
var defaults = program.defaults;
var currentWDir = process.cwd();

if (typeof program.new != 'undefined') {
  var projectName = program.new;
  console.log('Generating New Project: ' + projectName + ' in ' + currentWDir);
  gProject.generateProject(projectName, currentWDir, directory);
}
if (typeof program.g_component != 'undefined') {
  var componentType = 'component';
  var componentName = program.g_component;
  var componentFolderPath = gPath.generatePath('components', currentWDir);
  console.log('Generating Component File: ' + componentName + '.js');
  gFile.generateFile(componentFolderPath, componentType, componentName, inpm, directory, defaults);
}
if (typeof program.g_container != 'undefined') {
  var containerType = 'container';
  var containerName = program.g_container;
  var containerFolderPath = gPath.generatePath('containers', currentWDir);
  console.log('Generating Container File: ' + containerName + '.js');
  gFile.generateFile(containerFolderPath, containerType, containerName, inpm, directory, defaults);
}
if (typeof program.g_action != 'undefined') {
  var actionType = 'action';
  var actionName = program.g_action;
  var actionsFolderPath = gPath.generatePath('actions', currentWDir);
  console.log('Generating Action File: ' + actionName + '.js');
  gFile.generateFile(actionsFolderPath, actionType, actionName, inpm, directory, defaults);
}
if (typeof program.g_reducer != 'undefined') {
  var reducerType = 'reducer';
  var reducerName = program.g_reducer;
  var reducersFolderPath = gPath.generatePath('reducers', currentWDir);
  console.log('Generating Reducer File: ' + reducerName + '.js');
  gFile.generateFile(reducersFolderPath, reducerType, reducerName, inpm, directory, defaults);
}
if (typeof program.g_helper != 'undefined') {
  var helperType = 'helper';
  var helperName = program.g_helper;
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
