var fs = require('fs');

var eraseDefaults = function(defaults, directory) {
  var actionDefaults = directory + '/defaults/actionDefault.js';
  var componentDefaults = directory + '/defaults/componentDefault.js';
  var containerDefaults = directory + '/defaults/containerDefault.js';

  if (defaults.match(/actions/)) {
    console.log('Defaults: Erasing Action Defaults');
    fs.writeFile(actionDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log('Action Defaults Erased.');
    });
  } else if (defaults.match(/components/)) {
    console.log('Defaults: Erasing Component Defaults');
    fs.writeFile(componentDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log('Component Defaults Erased.');
    });
  } else if (defaults.match(/containers/)) {
    console.log('Defaults: Erasing Container Defaults');
    fs.writeFile(containerDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log('Container Defaults Erased.');
    });
  } else if (defaults.match(/all/)) {
    console.log('Defaults: Erasing All Defaults');
    [actionDefaults, componentDefaults, containerDefaults].forEach(function(def) {
      fs.writeFile(def, '', function (err) {
        if (err) { console.log(err); }
      });
    });
    console.log('All Defaults Erased.');
  }
};

module.exports.eraseDefaults = eraseDefaults;
