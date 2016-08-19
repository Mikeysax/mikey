import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

const app = express();
const compiler = webpack(config);
var dashboard = new Dashboard();
const PORT = 8080;

compiler.apply(new DashboardPlugin(dashboard.setData));

const webpackDevWare = webpackDevMiddleware(compiler, {
  quiet: true,
  publicPath: config.output.publicPath,
  stats: { colors: true }
});

app.use(webpackDevWare);
app.use(webpackHotMiddleware(compiler, {
  log: () => {}
}));

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
