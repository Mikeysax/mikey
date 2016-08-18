var path      = require('path');
var webpack   = require('webpack');
var baseConfig = require ('./webpack.config.base');
var merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
    './src/App'
  ],
  output: {
    publicPath: 'http://localhost:8080/dist/'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(jpg|png)$/, loader: 'url?limit=25000' },
      { test: /\.eot$/, loader: "file" },
      { test: /\.otf$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  // For enzyme testing
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },

  target: 'electron-renderer'
});
