var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack-isomorphic-tools-configuration');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(config);

var outDirectory = (process.env.NODE_ENV === 'production') ?
  'dist' :
  'build';

module.exports = {
  entry: [
    './client/App'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, outDirectory),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // JS Loaders
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      // CSS Loaders
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass')
      },
      // Image Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: '"production"'
     },
     __CLIENT__: true,
     __SERVER__: false,
     __DEVELOPMENT__: false
   }),
    webpackIsomorphicToolsPlugin
  ]
};
