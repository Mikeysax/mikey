var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
  res.status(200).send('ok');
});

var devServer = app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  var port = devServer.address().port;
  console.log('Listening at localhost:' + port);
});

module.exports = devServer;
