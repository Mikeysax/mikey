var path      = require('path');
var webpack   = require('webpack');
var prodCfg   = require('./webpack.prod.config');

Object.assign = require('object-assign');

module.exports = Object.assign(prodCfg, {
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './client/App'
  ],
  module: {
    loaders: [
      // JS Loaders
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      // CSS Loaders
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      // Image Loaders
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000'
      }
    ]
  },
  // For enzyme testing
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise'
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }
});
