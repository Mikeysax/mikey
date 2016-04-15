var fs = require('fs');
var prependFile = require('prepend-file');

var generateComponent = function(component, inpm) {
  var readComponentTemplate = fs.createReadStream('./templates/componentTemplate.js');
  var writeComponentFile = fs.createWriteStream('./js/components/' + component + '.js');
  readComponentTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, component);
    writeComponentFile.write(newData);
    writeComponentFile.end();
  });
  readComponentTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Component Template Used Successfully')
  });
  if (inpm) {
    inpm.forEach(function(i) {
      console.log('Adding: ' + i);
      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile('./js/components/' + component + '.js', importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + component + '.js');
      });
    });
  } else {
    console.log('Successfuly created ' + component + '.js');
  }
}

module.exports.generateComponent = generateComponent;
