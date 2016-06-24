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
    console.log('Saving Path To: ' + mikeyPathFile.match(/\/.mikeyPath.+/g));
    folderPath = new ff(fileType, {nottraversal: ['spec', 'test', 'tests', 'project_template', 'node_modules', 'user_auth_template']});
    prependFile(mikeyPathFile, folderPath, function(err) {
      if (err) { console.log(err); }
    });
  }

  var gitIgnorePath = currentWDir + '/.gitignore';
  fs.access(gitIgnorePath, fs.F_OK, function(error) {
    if (error) {
      console.log('Adding: .mikeyPath to .gitignore but file does not exist.');
    } else {
      var gitIgnoreFile = fs.readFileSync(gitIgnorePath, 'utf8');
      if (!gitIgnoreFile.match(/\.mikeyPath/)) {
        prependFile(gitIgnorePath, '.mikeyPath\n', function(error) {
          if (error) { console.log(error); }
        });
      }
    }
  });

  return(folderPath);
};

module.exports.generatePath = generatePath;
