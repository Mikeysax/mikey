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
    modules: ['node_modules', 'shared'],
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, outDirectory),
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      // JS Loaders
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // CSS Loaders
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      // Image Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      },
      // Video Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('videos'),
        loader: 'url-loader'
      },
      // Font Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'url-loader'
      },
      // SVG Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000',
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.UglifyJsPlugin(),
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
