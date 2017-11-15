// Server Dependencies
import Express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString, renderToStaticNodeStream } from 'react-dom/server';
import compression from 'compression';
import serialize from 'serialize-javascript';
import cors from 'cors';
// Database Dependencies
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
// For Server Fetch.
require('isomorphic-fetch');

// Router Dependencies
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import routes from './shared/routes';

// Store Dependencies
import configureStore from './client/store';

// Initial HTML Page
import InitialPage from './initialPage';

// Initialize Express App
const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(compression());
app.use(Express.static(__dirname + '/dist'));

const corsSettings = {
  origin: __DEVELOPMENT__ ? 'http://localhost:8080' : 'http://productionURL.com',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  preflightContinue: false
};
app.use(cors(corsSettings));

app.use('/api', require('./api/controllers'));
// See env.js to add secrets.
app.secret = process.env.APP_SECRET;


// Server Side Rendering
app.use((req, res) => {
  if (__DEVELOPMENT__) webpackIsomorphicTools.refresh();

  const initialState = {};
  const store = configureStore(initialState);

  // Initial HTML
  const initialPage = (html, store, assets) =>
    '<!doctype html>\n' + renderToString(<InitialPage assets={assets} component={html} store={store}/>);

  // Error Rendering
  const renderError = error => {
    const pad = '&#32;&#32;&#32;&#32;';
    const errorTrace = process.env.NODE_ENV !== 'production' ?
      `:<br><br><pre>${pad}${error.stack.replace(/\n/g, `<br>${pad}`)}</pre>` : '';
    res.send(initialPage(`<h1>Server Error:</h1> ${errorTrace}`, {}, webpackIsomorphicTools.assets()));
  };

  // Rendering
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('Error: ' + error);
      return res.status(500).end(renderError(error));
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store })
      .then(() => {
        const components = renderToString(
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        const htmlStream = renderToStaticNodeStream(
          <InitialPage
            assets={webpackIsomorphicTools.assets()}
            component={components}
            store={store}
          />
        );

        res.write('<!DOCTYPE html>\n');

        htmlStream.pipe(res, {end: false});
        htmlStream.on('end', () => res.end());
      })
      .catch(err => console.error('Caught Error in Server Render: ', err) );
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) return console.error('Server Express Error:', error);
  console.log('Server listening on: ' + PORT);
});

export default app;
