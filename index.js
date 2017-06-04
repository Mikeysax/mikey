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
var mikeyJsonGenerator = require('./generators/mikeyGen.js');

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .version('3.9.6')
  .option('new <projectName>', 'Generate New Mikey Project: react/redux/universal/electron', /^(react|redux|universal|electron)$/i)
  .option('g <fileType>', 'Generate New React File: container/component/action/reducer/helper/custom', /^(container|component|action|reducer|helper|custom)$/i)
  .option('-i, import [importName]', '(Optional) Add imports on file generation.', collect, [])
  .option('-d, defaults [Y/n]', '(Optional) Import default dependencies (n, Y).', /^(Y|n)$/i, 'n')
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
  if (program.new === 'react' || program.new === 'redux' || program.new === 'universal' || program.new === 'electron') {
    setTimeout(function() {
      var projectQuestion = '';
      if (program.new === 'universal') {
        projectQuestion = [
          {
            type: 'input',
            name: 'api',
            message: 'Universal App with API? (Y/n):'
          },
          {
            type: 'input',
            name: 'name',
            message: 'Enter Project Name:'
          }
        ];
      } else {
        projectQuestion = [
          {
            type: 'input',
            name: 'name',
            message: 'Enter Project Name:'
          }
        ];
      }
      inquirer.prompt(projectQuestion).then(function (answer) {
        var api = answer.api;
        if (api === 'Y' || api === 'y') {
          api = true;
        } else {
          api = false;
        }
        var projectType = program.new;
        var projectName = answer.name;
        if (projectName.length >= 1) {
          if (api === true || api === 'Y' || api === 'y') {
            console.log(colors.bold(`Generating New ${_.upperFirst(projectType)} Mikey Project with API: `) + colors.yellow(projectName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
          } else {
            console.log(colors.bold(`Generating New ${_.upperFirst(projectType)} Mikey Project: `) + colors.yellow(projectName.toString()) + colors.bold(' in ') + colors.yellow(currentWDir.toString()));
          }
          generateProject(projectName, currentWDir, directory, projectType, api);
        } else {
          console.log(colors.red('Project name cannot be blank!'));
        }
      });
    }, 100);
  } else {
    console.log(colors.red('Project type did not match and/or cannot be blank!'));
  }
}

// File Generation
if (typeof program.g !== 'undefined') {
  if (program.g === 'container' || program.g === 'component' || program.g === 'action' || program.g === 'reducer' || program.g === 'helper' || program.g === 'custom') {
    mikeyJsonGenerator(currentWDir);
    var fileType = _.lowerFirst(program.g);
    var filePathToFileType = '';

    if (fileType === 'custom') {
      filePathToFileType = directory + '/custom_templates/' + fileType;
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
          if (fileName.length <= 1 || templateName.length <= 1) {
            console.log(colors.red('File name or Template name cannot be blank!'));
          } else {
            var folderPath = generatePath(fileType + 's', currentWDir);
            console.log(colors.green('Generating ') + fileName + ' as ' + _.capitalize(fileType));
            generateCustomFile(folderPath, fileType, templateName, fileName, inpm, directory);
          }
        });
      }, 100);
    } else {
      filePathToFileType = directory + '/custom_templates/' + fileType;
      setTimeout(function() {
        var questions = [
          {
            type: 'input',
            name: 'fileNameAnswer',
            message: 'Enter Desired File Name(no extension):'
          }
        ];
        inquirer.prompt(questions).then(function (answer) {
          var fileName = '';
          if (fileType === 'component' || fileType === 'container') {
            fileName =  _.upperFirst(answer.fileNameAnswer);
          } else {
            fileName =  _.camelCase(answer.fileNameAnswer);
          }
          if (fileName.length <= 1) {
            console.log(colors.red('Filename cannot be blank!'));
          } else {
            var folderPath = generatePath(fileType + 's', currentWDir);
            console.log(colors.green('Generating ') + fileName + ' as ' + _.capitalize(fileType));
            generateFile(folderPath, fileType, fileName, inpm, directory, defaults, currentWDir);
          }
        });
      }, 100);
    }
  } else {
    console.log(colors.red('File type did not match and/or cannot be blank!'));
  }
}

// Erase Defaults
if (typeof program.erase !== 'undefined') {
  eraseDefaults(program.erase, directory);
}
// List Defaults
if (typeof program.list !== 'undefined') {
  listDefaults(program.list, directory);
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
