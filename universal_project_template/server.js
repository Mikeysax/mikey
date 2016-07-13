// Server Dependencies
import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Router Dependencies
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import routes from './shared/routes';

// Store Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Middleware
import thunkMiddleware from 'redux-thunk';

// Import Root Reducer
import rootReducer from './shared/js/reducers/index';

// Lib
import fetchComponentData from './shared/lib/fetchComponentData';


const app = express();

app.use('/bundle.js', function (req, res) {
  return fs.createReadStream('./dist/bundle.js').pipe(res);
});

app.use( (req, res) => {
  const reducer  = combineReducers(rootReducer);
  const store    = applyMiddleware(thunkMiddleware)(createStore)(reducer);

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      return res.status(404).end('Not found');
    }

    function renderView() {

      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = ReactDOMServer.renderToStaticMarkup(InitialView);
      const initialState = store.getState();

      // Initial HTML
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
          <meta charset="utf-8">
          <title>Redux Demo</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="app">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});

export default app;
