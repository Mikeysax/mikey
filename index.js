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
  console.log('Generating Action File: ' + program.action + '.js');
  var readActionTemplate = fs.createReadStream('./templates/actionTemplate.js');
  var writeActionFile = fs.createWriteStream(__dirname + '/js/actions/' + program.action + '.js');
  readActionTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, program.action);
    writeActionFile.write(newData);
    writeActionFile.end();
  });
  readActionTemplate.on('end', function() {
    console.log('Action Template Used Successfully')
  });

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);
      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/actions/' + program.action + '.js', importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.action + '.js');
      });
    });
  } else {
    console.log('Successfuly created ' + program.action + '.js');
  }
}

//Generate Component
if (program.component) {
  console.log('Generating Component File: ' + program.component + '.js');
  var readComponentTemplate = fs.createReadStream('./templates/componentTemplate.js');
  var writeComponentFile = fs.createWriteStream(__dirname + '/js/components/' + program.component + '.js');
  readComponentTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, program.component);
    writeComponentFile.write(newData);
    writeComponentFile.end();
  });
  readComponentTemplate.on('end', function() {
    console.log('Component Template Used Successfully')
  });

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);
      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/components/' + program.component + '.js', importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.component + '.js');
      });
    });
  } else {
    console.log('Successfuly created ' + program.component + '.js');
  }
}

//Generate Container
if (program.container) {
  console.log('Generating Container File: ' + program.container + '.js');
  var readContainerTemplate = fs.createReadStream('./templates/containerTemplate.js');
  var writeContainerFile = fs.createWriteStream(__dirname + '/js/containers/' + program.container + '.js');
  readContainerTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, program.container);
    writeContainerFile.write(newData);
    writeContainerFile.end();
  });
  readContainerTemplate.on('end', function() {
    console.log('Component Template Used Successfully')
  });

  if (program.importNpm) {
    program.importNpm.forEach(function(i) {
      console.log('Adding: ' + i);

      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile(__dirname + '/js/containers/' + program.container + '.js', importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + program.container + '.js');
      });
    });
  } else {
    console.log('Successfuly created ' + program.container + '.js');
  }
}
