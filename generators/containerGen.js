var fs = require('fs');
var prependFile = require('prepend-file');

var generateContainer = function(container, inpm) {
  var readContainerTemplate = fs.createReadStream('./templates/containerTemplate.js');
  var writeContainerFile = fs.createWriteStream('./js/containers/' + container + '.js');
  readContainerTemplate.on('data', function(chunk) {
    var newData = chunk.toString().replace(/name/g, container);
    writeContainerFile.write(newData);
    writeContainerFile.end();
  });
  readContainerTemplate.on('end', function(error) {
    if (error) {
      console.log(error);
    }
    console.log('Component Template Used Successfully')
  });
  if (inpm) {
    inpm.forEach(function(i) {
      console.log('Adding: ' + i);

      var importLine = "import " + i + " from " + "'" + i + "';\n"
      prependFile('./js/containers/' + container + '.js', importLine, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully created ' + container + '.js');
      });
    });
  } else {
    console.log('Successfuly created ' + container + '.js');
  }
};

module.exports.generateContainer = generateContainer;
