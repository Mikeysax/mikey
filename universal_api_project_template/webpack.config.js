var path      = require('path');
var webpack   = require('webpack');
var prodCfg   = require('./webpack.prod.config');

Object.assign = require('object-assign');

var config = require('./webpack-isomorphic-tools-configuration');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(config);

module.exports = Object.assign(prodCfg, {
  devtool: 'inline-source-map',
  entry:  {
    'main': [
      // 'webpack-dev-server/client?http://127.0.0.1:8080/',
      // 'webpack/hot/only-dev-server',
      './client/App'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      // JS Loaders
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader']
      },
      // CSS Loaders
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // Image Loaders
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader'
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
        loader: 'url-loader'
      },
      // Font Loaders
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise'
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }
});
