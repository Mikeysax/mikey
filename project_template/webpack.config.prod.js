var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    // Image Loaders
    {
      test: /\.(jpg|png)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=25000'
    }
    ]
  }
};
