var path = require('path');

var outDirectory = (process.env.NODE_ENV === 'production') ?
  'dist' :
  'build';

module.exports = {
  entry: [
    './client/App'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:        ['', '.js', '.jsx']
  },
  output: {
    path:     path.join(__dirname, outDirectory),
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
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      // Image Loaders
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
};
