#!/usr/bin/env node
var program = require('commander');
var gFile = require('./generators/fileGen.js');
var eDefaults = require('./defaults/eraseDefaults.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}
program
  .version('0.3.0')
  .option('componentCreator <componentCreator>', 'Generate React component js file.')
  .option('containerCreator <containerCreator>', 'Generate React Redux container js file.')
  .option('actionCreator <actionCreator>', 'Generate React action js file.')
  .option('-i, --importNpm [importNpm]', '(Optional) Import npm packages into file. Enter with {} if needed.', collect, [])
  .option('-d, --defaults [defaults]', 'Import previous dependencies for file type. No if blank.(No, Yes)', /^(yes|no)$/i, 'no')
  .option('-e, --erase [erase]', 'Erase defaults: actions/containers/components/all', /^(actions|components|containers|all)$/i, 'nothing')
  .parse(process.argv);

var directory = __dirname;
var inpm = program.importNpm;
var defaults = program.defaults;

if (typeof program.componentCreator != 'undefined') {
  var componentType = 'component';
  var componentName = program.componentCreator;
  console.log('Generating Component File: ' + componentName + '.js');
  gFile.generateFile(componentType, componentName, inpm, directory, defaults);
} else if (typeof program.containerCreator != 'undefined') {
  var containerType = 'container';
  var containerName = program.containerCreator;
  console.log('Generating Container File: ' + containerName + '.js');
  gFile.generateFile(containerType, containerName, inpm, directory, defaults);
} else if (typeof program.actionCreator != 'undefined') {
  var actionType = 'action';
  var actionName = program.actionCreator;
  console.log('Generating Action File: ' + actionName + '.js');
  gFile.generateFile(actionType, actionName, inpm, directory, defaults);
} else if (typeof program.erase != 'undefined') {
  eDefaults.eraseDefaults(program.erase, directory);
}
