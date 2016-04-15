#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var prependFile = require('prepend-file');

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .version('0.0.1')
  .option('-a, action <actionName>', 'Generate React action js file.')
  .option('-comp, component <componentName>', 'Generate React component js file.')
  .option('-cont, container <containerName>', 'Generate React container js file.')
  .option('-i, importNpm [importNpm]', '(Optional) Import npm packages into file.', collect, [])
  .parse(process.argv);


//Generate Action
if (program.action) {
  console.log('Generating Action: ' + program.action);

  var actionFileStream = fs.createWriteStream(__dirname + '/js/actions/' + program.action);
  var actionName = program.action.toString().slice(0, -3);
  var actionFileContents = "\n\n\n\n  const " + actionName + " = " + "()" + " => " +
                           "{ \n\n  };\n\n\n\n\n\n" + "export default " + actionName + ";";

  actionFileStream.write(actionFileContents);
  actionFileStream.end();

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);

      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/actions/' + program.action, importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.action);
      });
    });
  } else {
    console.log('Successfuly created ' + program.action);
  }
}


//Generate Component
if (program.component) {
  console.log('Generating Component: ' + program.component);

  var componentFileStream = fs.createWriteStream(__dirname + '/js/components/' + program.component);
  var componentName = program.component.toString().slice(0, -3);
  var componentFileContents = "placeholder";

  componentFileStream.write(componentFileContents);
  componentFileStream.end();

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);

      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/components/' + program.component, importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.component);
      });
    });
  } else {
    console.log('Successfuly created ' + program.component);
  }
  prependFile(__dirname + '/js/components/' + program.component, 'import React from ' + 'react' + ';', function(err) {
    if (err) {
      console.log(err);
    }
  });
}


//Generate Container
if (program.container) {
  console.log('Generating Container: ' + program.container);

  var containerFileStream = fs.createWriteStream(__dirname + '/js/containers/' + program.container);
  var containerName = program.container.toString().slice(0, -3);
  var containerFileContents = "placeholder";

  containerFileStream.write(containerFileContents);
  containerFileStream.end();

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);

      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/containers/' + program.container, importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.container);
      });
    });
  } else {
    console.log('Successfuly created ' + program.container);
  }
  prependFile(__dirname + '/js/containers/' + program.container, 'import React from ' + 'react' + ';', function(err) {
    if (err) {
      console.log(err);
    }
  });
}
