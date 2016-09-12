#!/usr/bin/env node
// Project Dependencies
var program = require('commander');
var colors = require('colors');
var inquirer = require('inquirer');
var _ = require('lodash');

// Mikey Files
var generatePath = require('./generators/pathGen.js');
var generateProject = require('./generators/projectGen.js');
var generateFile = require('./generators/fileGen.js');
var generateCustomFile = require('./generators/customGen.js');
var eraseDefaults = require('./defaults/eraseDefaults.js');
var listDefaults = require('./defaults/listDefaults.js');
var saveTemplate = require('./custom_templates/saveTemplate.js');
var deleteTemplate = require('./custom_templates/deleteTemplate.js');
var listTemplates = require('./custom_templates/listTemplates.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .version('3.3.1')
  .option('new <projectName>', 'Generate New Mikey Project: react/redux/universal/electron', /^(react|redux|universal|electron)$/i)
  .option('g_container <fileName>', 'Generate Container file.')
  .option('g_component <fileName>', 'Generate Component file.')
  .option('g_action <fileName>', 'Generate action file.')
  .option('g_reducer <fileName>', 'Generate reducer file.')
  .option('g_helper <fileName>', 'Generate helper file.')
  .option('g_file <fileType>', 'Generate custom file from saved template.(singular)')
  .option('-i, import [importName]', '(Optional) Add import to generated file.', collect, [])
  .option('-d, defaults [Y/n]', '(Optional) Import previous dependencies for generated file. Defaults to No: (n, Y)', /^(Y|n)$/i, 'n')
  .option('-l, list [choice]', 'List defaults(plural): all/actions/containers/components/reducers/helpers', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('-e, erase [choice]', 'Erase defaults(plural): all/actions/containers/components/reducers/helpers', /^(actions|components|containers|reducers|helpers|all)$/i, 'undefined')
  .option('save_template [fileType]', 'Save file in current project as custom template.(singular)', /^(action|component|container|reducer|helper)$/i)
  .option('delete_template [fileType]', 'Delete saved custom template.(singular)', /^(action|component|container|reducer|helper)$/i)
  .option('list_templates [fileType]', 'List saved custom templates for file type.(singular)', /^(action|component|container|reducer|helper)$/i)
  .parse(process.argv);

// Directory for Mikey
var directory = __dirname;
// Imports
var inpm = program.import;
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
  setTimeout(function() {
    var projectQuestion = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter Project Name:'
      }
    ];

    inquirer.prompt(projectQuestion).then(function (answer) {
      var projectType = program.new;
      var projectName = answer.name;

      console.log(colors.bold(`Generating New ${_.upperFirst(projectType)} Mikey Project: `) + colors.yellow(projectName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
      generateProject(projectName, currentWDir, directory, projectType);
    });
  }, 100);
}

// File Generation
var reactFileType = '';
var genFileName = '';
// Set File Variables
if (typeof program.g_component !== 'undefined') {
  reactFileType = 'component';
  genFileName = _.upperFirst(program.g_component);
}
if (typeof program.g_container !== 'undefined') {
  reactFileType = 'container';
  genFileName = _.upperFirst(program.g_container);
}
if (typeof program.g_action !== 'undefined') {
  reactFileType = 'action';
  genFileName = _.camelCase(program.g_action);
}
if (typeof program.g_reducer !== 'undefined') {
  reactFileType = 'reducer';
  genFileName = _.camelCase(program.g_reducer);
}
if (typeof program.g_helper !== 'undefined') {
  reactFileType = 'helper';
  genFileName = _.camelCase(program.g_helper);
}
// Generate File Call
if (reactFileType.length > 1 && genFileName.length > 1) {
  var folderPath = generatePath(reactFileType + 's', currentWDir);
  console.log(colors.bold.underline('Generating ' + _.capitalize(reactFileType) + ' File:') + ' ' + colors.yellow(genFileName + '.js'));
  generateFile(folderPath, reactFileType, genFileName, inpm, directory, defaults, currentWDir);
}

// Erase Defaults
if (typeof program.erase !== 'undefined') {
  eraseDefaults(program.erase, directory);
}
// List Defaults
if (typeof program.list !== 'undefined') {
  listDefaults(program.list, directory);
}

// Custom File Generation
if (typeof program.g_file !== 'undefined') {
  var fileType = _.lowerFirst(program.g_file);
  // List Files
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  listTemplates(fileType, filePathToFileType);

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
      var folderPath = generatePath(fileType + 's', currentWDir);
      console.log(colors.green('Generating ') + fileName + ' as ' + _.capitalize(fileType));
      generateCustomFile(folderPath, fileType, templateName, fileName, inpm, directory);
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
  var filePath = generatePath(fileType + 's', currentWDir);
  // List Files
  listTemplates(fileType, filePath);

  setTimeout(function() {
    inquirer.prompt(question).then(function (answer) {
      var templateName = answer.saveFile;
      // Save File
      saveTemplate(filePath, fileType, templateName, directory);
    });
  }, 100);
}

// Delete Custom Template
if (typeof program.delete_template !== 'undefined') {
  var fileType = _.lowerFirst(program.delete_template);
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  // List Files
  listTemplates(fileType, filePathToFileType);

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
      deleteTemplate(fileType, templateName, directory);
    })
  }, 100);
}

// List Files
if (typeof program.list_templates !== 'undefined') {
  var fileType = _.lowerFirst(program.list_templates);
  var filePathToFileType = directory + '/custom_templates/' + fileType;
  listTemplates(fileType, filePathToFileType);
}
