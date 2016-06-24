var fs = require('fs');
var colors = require('colors');

var eraseDefaults = function(defaults, directory) {
  var actionDefaults = directory + '/defaults/actionDefault.js';
  var componentDefaults = directory + '/defaults/componentDefault.js';
  var containerDefaults = directory + '/defaults/containerDefault.js';
  var reducerDefaults = directory + '/defaults/reducerDefault.js';
  var helperDefaults = directory + '/defaults/helperDefault.js';

  if (defaults.match(/actions/)) {
    console.log('Defaults: Erasing Action Defaults');
    fs.writeFile(actionDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log(colors.red('Action Defaults Erased.'));
    });
  } else if (defaults.match(/components/)) {
    console.log('Defaults: Erasing Component Defaults');
    fs.writeFile(componentDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log(colors.red('Component Defaults Erased.'));
    });
  } else if (defaults.match(/containers/)) {
    console.log('Defaults: Erasing Container Defaults');
    fs.writeFile(containerDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log(colors.red('Container Defaults Erased.'));
    });
  } else if (defaults.match(/reducers/)) {
    console.log('Defaults: Erasing Reducer Defaults');
    fs.writeFile(reducerDefaults, '', function(err) {
      if (err) { console.log(err); }
      console.log(colors.red('Reducer Defaults Erased.'));
    });
  } else if (defaults.match(/helpers/)) {
      console.log('Defaults: Erasing Helper Defaults');
      fs.writeFile(helperDefaults, '', function(err) {
        if (err) { console.log(err); }
        console.log(colors.red('Helper Defaults Erased.'));
      });
  } else if (defaults.match(/all/)) {
    console.log('Defaults: Erasing All Defaults');
    [actionDefaults, componentDefaults,
     containerDefaults, reducerDefaults,
     helperDefaults].forEach(function(def) {
      fs.writeFile(def, '', function (err) {
        if (err) { console.log(err); }
      });
    });
    console.log(colors.red('All Defaults Erased.'));
  }
};

module.exports.eraseDefaults = eraseDefaults;
