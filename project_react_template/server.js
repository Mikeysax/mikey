var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

var app = express();
var compiler = webpack(config);
var dashboard = new Dashboard();

compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
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
