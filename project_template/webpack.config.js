module.exports = {
  entry: getEntrySources(['./src/js/App.js']),
  output: {
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?stage=0'
        ]
      }
    ]
  }
};

function getEntrySources(sources) {
  //if (process.env.NODE_ENV !== 'production') {
  //    sources.push('webpack-dev-server/client?http://localhost:8080');
  //    sources.push('webpack/hot/only-dev-server');
  //}
  
  return sources;
}
