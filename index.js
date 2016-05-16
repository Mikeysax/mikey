#!/usr/bin/env node
var program = require('commander');
var gPath = require('./generators/pathGen.js');
var gProject = require('./generators/projectGen.js');
var gAuth = require('./generators/userAuthGen.js')
var gFile = require('./generators/fileGen.js');
var eDefaults = require('./defaults/eraseDefaults.js');
var lDefaults = require('./defaults/listDefaults.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}
program
  .version('0.9.0')
  .option('new <new>', 'Generate New React-Redux Project.')
  .option('authCreator <authCreator>', 'Add API User Auth and Files. Input entry file name without extension')
  .option('componentCreator <componentCreator>', 'Generate React component js file.')
  .option('containerCreator <containerCreator>', 'Generate React-Redux container js file.')
  .option('actionCreator <actionCreator>', 'Generate React action js file.')
  .option('reducerCreator <reducerCreator>', 'Generate React reducer js file.')
  .option('helperCreator <helperCreator>', 'Generate React helper js file.')
  .option('-i, importNpm [importNpm]', '(Optional) Import npm packages into file. Enter with {} if needed.', collect, [])
  .option('-d, defaults [defaults]', 'Import previous dependencies for file type. No if blank.(n, Y)', /^(Y|n)$/i, 'n')
  .option('-e, erase [erase]', 'Erase defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('-l, list [list]', 'List defaults: actions/containers/components/reducers/helpers/all', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .parse(process.argv);

var directory = __dirname;
var inpm = program.importNpm;
var defaults = program.defaults;
var currentWDir = process.cwd();

if (typeof program.new != 'undefined') {
  var projectName = program.new;
  console.log('Generating New Project: ' + projectName + ' in ' + currentWDir);
  gProject.generateProject(projectName, currentWDir, directory);
}
if (typeof program.authCreator != 'undefined') {
  var entry = program.authCreator;
  console.log('Generating User Authentication Files');
  gAuth.generateUserAuth(currentWDir, directory, entry);
}
if (typeof program.componentCreator != 'undefined') {
  var componentType = 'component';
  var componentName = program.componentCreator;
  var componentFolderPath = gPath.generatePath('components', currentWDir);
  console.log('Generating Component File: ' + componentName + '.js');
  gFile.generateFile(componentFolderPath, componentType, componentName, inpm, directory, defaults);
}
if (typeof program.containerCreator != 'undefined') {
  var containerType = 'container';
  var containerName = program.containerCreator;
  var containerFolderPath = gPath.generatePath('containers', currentWDir);
  console.log('Generating Container File: ' + containerName + '.js');
  gFile.generateFile(containerFolderPath, containerType, containerName, inpm, directory, defaults);
}
if (typeof program.actionCreator != 'undefined') {
  var actionType = 'action';
  var actionName = program.actionCreator;
  var actionsFolderPath = gPath.generatePath('actions', currentWDir);
  console.log('Generating Action File: ' + actionName + '.js');
  gFile.generateFile(actionsFolderPath, actionType, actionName, inpm, directory, defaults);
}
if (typeof program.reducerCreator != 'undefined') {
  var reducerType = 'reducer';
  var reducerName = program.reducerCreator;
  var reducersFolderPath = gPath.generatePath('reducers', currentWDir);
  console.log('Generating Reducer File: ' + reducerName + '.js');
  gFile.generateFile(reducersFolderPath, reducerType, reducerName, inpm, directory, defaults);
}
if (typeof program.helperCreator != 'undefined') {
  var helperType = 'helper';
  var helperName = program.helperCreator;
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
