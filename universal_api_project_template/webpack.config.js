const path      = require('path');
const webpack   = require('webpack');
const autoprefixer = require('autoprefixer');

Object.assign = require('object-assign');

const config = require('./webpack-isomorphic-tools-configuration');
const WITPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WITPlugin(config);
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry:  [
    require.resolve('react-error-overlay'),
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/dist/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          // JS Loaders
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            }
          },
          // CSS Loaders
          {
            test: /\.(scss|sass)$/,
            exclude: /node_modules/,
            use: [
              require.resolve('isomorphic-style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
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
              },
              {
                loader: require.resolve('sass-loader')
              }
            ]
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
  // For enzyme testing
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('development'),
        NODE_ENV: JSON.stringify('development')
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin('./node_modules'),
    new webpack.ProvidePlugin({
      'Promise': 'exports-loader?global.Promise!es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.EnvironmentPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ],
  devServer: {
    compress: true,
    inline: true,
    watchContentBase: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    },
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1',
    before(app) {
      app.use(noopServiceWorkerMiddleware());
    }
  },
  performance: {
    hints: false,
  }
};
