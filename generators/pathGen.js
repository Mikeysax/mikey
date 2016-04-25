var fs = require('fs-extra');
var ff = require('node-find-folder');
var prependFile = require('prepend-file');

var generatePath = function(fileType, currentWDir) {
  var mikeyPathFile = currentWDir + '/.mikeyPath/.' + fileType;
  fs.ensureFileSync(mikeyPathFile, function(error) {
    if (error) { console.log(error); }
  });

  var readMikeyPath = fs.readFileSync(mikeyPathFile, 'utf8');
  var fileRExp = new RegExp(fileType, 'g');
  var folderPath = null;

  if (readMikeyPath.match(fileRExp)) {
    folderPath = readMikeyPath;
  } else {
    console.log('Saving Path To: ' + mikeyPathFile);
    folderPath = new ff(fileType, {nottraversal: ['test', 'project_template', 'node_modules']});
    prependFile(mikeyPathFile, folderPath, function(err) {
      if (err) { console.log(err); }
    });
  }
  return(folderPath);
};

module.exports.generatePath = generatePath;
