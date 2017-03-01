// Server Dependencies
import Express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import compression from 'compression';
import serialize from 'serialize-javascript';
import cors from 'cors';
// Database Dependencies
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
let models = require('./api/models');

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
app.use(cors());
app.use('/api', require('./api/controllers'));
app.secret = process.env.APP_SECRET;

// Server Side Rendering
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const initialState = {};
  const store = configureStore(initialState);

  // Initial HTML
  const initialPage = (html, store, assets) => {
    return '<!doctype html>\n' + renderToString(<InitialPage assets={assets} component={html} store={store}/>);
  };

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
      console.log('Error: ' + error);
      return res.status(500).end(renderError(error));

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const components = renderToStaticMarkup(
          <Provider store={store}>
             <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        res.status(200);
        res.send('<!doctype html>\n' +
          renderToString(
            <InitialPage
              assets={webpackIsomorphicTools.assets()}
              component={components}
              store={store}
            />
          )
        );
      })
      .catch(err => {
        console.log('Caught Error in Server Render: ');
        console.log(err);
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

// Port
const PORT = process.env.PORT || 3000;
// App / Server Start
models.waterline.initialize(models.config, function(err, models) {
  if(err) throw err;
  // console.log(models.collections);
  app.models = models.collections;
  app.connections = models.connections;

  app.listen(PORT, (error) => {
    if (!error) { console.log('Server listening on: ' + PORT); }
  });
});

export default app;
