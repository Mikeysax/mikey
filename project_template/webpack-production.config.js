module.exports = {
  entry: getEntrySources(["./src/js/helpers/setProduction.js"]),
  output: {
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
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
          'babel?stage=0'
        ]
      }
    ]
  }
};

function getEntrySources(sources) {  
  return sources;
}
