#!/usr/bin/env node
var program = require('commander');
var gComponent = require('./generators/componentGen.js');
var gContainer = require('./generators/containerGen.js');
var gAction = require('./generators/actionGen.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .option('component <component>', 'Generate React component js file.')
  .option('container <container>', 'Generate React Redux container js file.')
  .option('action <action>', 'Generate React action js file.')
  .option('-i, importNpm [importNpm]', '(Optional) Import npm packages into file.', collect, [])
  .parse(process.argv);

var inpm = program.importNpm;

if (program.component) {
  var component = program.component;
  console.log('Generating Component File: ' + component + '.js');
  gComponent.generateComponent(component, inpm);

} else if (program.container) {
  var container = program.container;
  console.log('Generating Container File: ' + container + '.js');
  gContainer.generateContainer(container, inpm);

} else if (program.action) {
  var action = program.action;
  console.log('Generating Action File: ' + action + '.js');
  gAction.generateAction(action, inpm);
}
