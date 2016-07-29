#!/usr/bin/env node
// Project Dependencies
var program = require('commander');
var colors = require('colors');
var inquirer = require('inquirer');
var _ = require('lodash');

// Mikey Files
var gPath = require('./generators/pathGen.js');
var gProject = require('./generators/projectGen.js');
var gFile = require('./generators/fileGen.js');
var gCustom = require('./generators/customGen.js');
var eDefaults = require('./defaults/eraseDefaults.js');
var lDefaults = require('./defaults/listDefaults.js');
var sTemp = require('./custom_templates/saveTemplate.js');
var dTemp = require('./custom_templates/deleteTemplate.js');
var lTemp = require('./custom_templates/listTemplates.js');

function collect(val, memo) {
  console.log(val)
  memo.push(val);
  return memo;
}

program
  .version('2.1.5')
  .option('new <projectName>', 'Generate New React-Redux Project.')
  .option('universal <projectName>', 'Generate New Universal React-Redux Project.')
  .option('g_container <ContainerName>', 'Generate Container file.')
  .option('g_component <ComponentName>', 'Generate Component file.')
  .option('g_action <actionName>', 'Generate action file.')
  .option('g_reducer <reducerName>', 'Generate reducer file.')
  .option('g_helper <helperName>', 'Generate helper file.')
  .option('g_file <fileType>', 'Generate custom file from saved template.')
  .option('-i, import [importName]', '(Optional) Add import to generated file.', collect, [])
  .option('-d, defaults [defaults]', '(Optional) Import previous dependencies for generated file. Defaults to No: (n, Y)', /^(Y|n)$/i, 'n')
  .option('-l, list [list]', 'List defaults: all/actions/containers/components/reducers/helpers', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('-e, erase [erase]', 'Erase defaults: all/actions/containers/components/reducers/helpers', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('save_template [fileType]', 'Save file in current project as custom template.', /^(action|component|container|reducer|helper)$/i)
  .option('delete_template [fileType]', 'Delete saved custom template.', /^(action|component|container|reducer|helper)$/i)
  .option('list_templates [fileType]', 'List saved custom templates for file type.', /^(action|component|container|reducer|helper)$/i)
  .parse(process.argv);

// Directory for Mikey
var directory = __dirname;
// Imports
var inpm = program.importName;
// Defaults
var defaults = program.defaults;
// Current Working Directory
var currentWDir = process.cwd();

// Automated Help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// Project Generation
if (typeof program.new !== 'undefined') {
  var projectName = program.new;
  var universal = false;
  console.log(colors.bold('Generating New Project: ') + colors.yellow(projectName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
  gProject.generateProject(projectName, currentWDir, directory, universal);
}

// Universal Project Generation
if (typeof program.universal !== 'undefined') {
  var projectName = program.universal;
  var universal = true;
  console.log(colors.bold('Generating New Universal Project: ') + colors.yellow(projectName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
  gProject.generateProject(projectName, currentWDir, directory, universal);
}

// File Generation
var reactFileType = '';
var genFileName = '';
// Set File Variables
if (typeof program.g_component !== 'undefined') {
  reactFileType = 'component';
  genFileName = program.g_component;
}
if (typeof program.g_container !== 'undefined') {
  reactFileType = 'container';
  genFileName = program.g_container;
}
if (typeof program.g_action !== 'undefined') {
  reactFileType = 'action';
  genFileName = program.g_action;
}
if (typeof program.g_reducer !== 'undefined') {
  reactFileType = 'reducer';
  genFileName = program.g_reducer;
}
if (typeof program.g_helper !== 'undefined') {
  reactFileType = 'helper';
  genFileName = program.g_helper;
}
// Generate File Call
if (reactFileType.length > 1 && genFileName.length > 1) {
  var folderPath = gPath.generatePath(reactFileType + 's', currentWDir);
  console.log(colors.bold.underline('Generating ' + _.capitalize(reactFileType) + ' File:') + ' ' + colors.yellow(genFileName + '.js'));
  gFile.generateFile(folderPath, reactFileType, genFileName, inpm, directory, defaults);
}

// Erase Defaults
if (typeof program.erase !== 'undefined') {
  eDefaults.eraseDefaults(program.erase, directory);
}
// List Defaults
if (typeof program.list !== 'undefined') {
  lDefaults.listDefaults(program.list, directory);
}

// Custom File Generation
if (typeof program.g_file !== 'undefined') {
  var fileType = _.lowerFirst(program.g_file);
  // List Files
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  lTemp.listTemplates(fileType, filePathToFileType);

  setTimeout(function() {
    var questions = [
      {
        type: 'input',
        name: 'templateName',
        message: 'Enter Saved Template Name(no extension):'
      },
      {
        type: 'input',
        name: 'fileNameAnswer',
        message: 'Enter Desired File Name(no extension / default: Template Name):'
      }];
    inquirer.prompt(questions).then(function (answer) {
      var templateName = answer.templateName;
      var fileName = answer.fileNameAnswer;
      var folderPath = gPath.generatePath(fileType + 's', currentWDir);
      console.log(colors.green('Generating ') + fileName + ' as ' + _.capitalize(fileType));
      gCustom.generateCustomFile(folderPath, fileType, templateName, fileName, inpm, directory);
    });
  }, 100);
}

// Save Custom Template
if (typeof program.save_template !== 'undefined') {
  // Prompt Questions
  var question = [
    {
      type: 'input',
      name: 'saveFile',
      message: 'Enter Project ' + _.capitalize(program.save_template) + ' File Name To Save(no extension):'
    }
  ];

  var fileType = _.lowerFirst(program.save_template);
  var filePath = gPath.generatePath(fileType + 's', currentWDir);
  // List Files
  lTemp.listTemplates(fileType, filePath);

  setTimeout(function() {
    inquirer.prompt(question).then(function (answer) {
      var templateName = answer.saveFile;
      // Save File
      sTemp.saveTemplate(filePath, fileType, templateName, directory);
    });
  }, 100);
}

// Delete Custom Template
if (typeof program.delete_template !== 'undefined') {
  var fileType = _.lowerFirst(program.delete_template);
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  // List Files
  lTemp.listTemplates(fileType, filePathToFileType);

  setTimeout(function() {
    // Prompt Questions
    var question = [
      {
        type: 'input',
        name: 'deleteFile',
        message: 'Enter ' + _.capitalize(program.delete_template) + ' Template Name To Delete(no extension):'
      }
    ];
    inquirer.prompt(question).then(function (answer) {
      var templateName = answer.deleteFile;
      // Delete File
      dTemp.deleteTemplate(fileType, templateName, directory);
    })
  }, 100);
}

// List Files
if (typeof program.list_templates !== 'undefined') {
  var fileType = _.lowerFirst(program.list_templates);
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  lTemp.listTemplates(fileType, filePathToFileType);
}
