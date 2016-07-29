var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (error) {
  console.error('ERROR: Error parsing your .babelrc.');
  console.error(error);
}

require('babel-core/register')(config);
//
//
var path = require('path');
var rootDir = path.resolve(__dirname, '');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var webpackConfig = require('./webpack-isomorphic-tools-configuration');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackConfig)
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./server');
  });
