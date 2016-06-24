var fs = require('fs');
var _ = require('lodash');
var colors = require('colors');

var listDefaults = function(defaults, directory) {
  var actionDefaults = directory + '/defaults/actionDefault.js';
  var componentDefaults = directory + '/defaults/componentDefault.js';
  var containerDefaults = directory + '/defaults/containerDefault.js';
  var reducerDefaults = directory + '/defaults/reducerDefault.js';
  var helperDefaults = directory + '/defaults/helperDefault.js';

  if (defaults.match(/actions/)) {
    fs.readFile(actionDefaults, 'utf-8', function(err, data) {
      if (err) { console.log(err); }
      console.log(colors.red('Action Defaults: '));
      console.log(data);
    });
  } else if (defaults.match(/components/)) {
    fs.readFile(componentDefaults, 'utf-8', function(err, data) {
      if (err) { console.log(err); }
      console.log(colors.red('Component Defaults: '));
      console.log(data);
    });
  } else if (defaults.match(/containers/)) {
    fs.readFile(containerDefaults, 'utf-8', function(err, data) {
      if (err) { console.log(err); }
      console.log(colors.red('Container Defaults: '));
      console.log(data);
    });
  } else if (defaults.match(/reducers/)) {
    fs.readFile(reducerDefaults, 'utf-8', function(err, data) {
      if (err) { console.log(err); }
      console.log(colors.red('Reducer Defaults: '));
      console.log(data);
    });
  } else if (defaults.match(/helpers/)) {
    fs.readFile(helperDefaults, 'utf-8', function(err, data) {
      if (err) { console.log(err); }
      console.log(colors.red('Helper Defaults: '));
      console.log(data);
    });
  } else if (defaults.match(/all/)) {
    [actionDefaults, componentDefaults,
     containerDefaults, reducerDefaults,
     helperDefaults].forEach(function(def) {
        fs.readFile(def, 'utf-8', function(err, data) {
          if (err) { console.log(err); }
          console.log(colors.red(_.capitalize(def.match(/action|component|container|reducer|helper/g)) + ' Defaults: '));
          console.log(data);
       });
    });
  }
};

module.exports.listDefaults = listDefaults;
