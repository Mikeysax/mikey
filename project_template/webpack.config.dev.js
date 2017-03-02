var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
    // JS Loaders
    {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /(node_modules|bower_components)/
    },
    // CSS Loaders
    {
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    // Image Loaders
    {
      test: /\.(jpg|png)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=25000'
    }
    ]
  },
  // For enzyme testing
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
