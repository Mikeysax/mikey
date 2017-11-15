var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

var config = require('./webpack-isomorphic-tools-configuration');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(config);

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    './client/App'
  ],
  resolve: {
    modules: ['node_modules', 'shared'],
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true
            }
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: [{
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true
                  }
                }, {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9'
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                }, {
                  loader: require.resolve('sass-loader'),
                  options: {
                    minimize: true
                  }
                }
              ]
            })
          },
          // Image Loaders
          {
            test: webpackIsomorphicToolsPlugin.regular_expression('images'),
            loader: require.resolve('url-loader')
          },
          // Video Loaders
          {
            test: webpackIsomorphicToolsPlugin.regular_expression('videos'),
            loader: require.resolve('url-loader')
          },
          // Font Loaders
          {
            test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
            loader: require.resolve('url-loader')
          },
          // SVG Loaders
          {
            test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
            loader: require.resolve('url-loader')
          },
          // Font Loaders
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: require.resolve('url-loader'),
          },
          // Other
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css', //bundle.css
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    // Uglify might not work either in production.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      }
    }),
    // SWPrecacheWebpackPlugin might not work properly in production as set up.
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) return;
        if (message.indexOf('Skipping static resource') === 0) return;
        console.log(message);
      },
      minify: true,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.EnvironmentPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify("production"),
        NODE_ENV: JSON.stringify("production")
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false
   }),
    webpackIsomorphicToolsPlugin
  ]
};
