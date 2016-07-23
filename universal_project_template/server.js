// Server Dependencies
import Express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import compression from 'compression';
import stringify from 'fast-stable-stringify';

// Router Dependencies
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import routes from './shared/routes';

// Store Dependencies
import configureStore from './client/store';

// Initialize Express App
const app = new Express();

app.use(compression());
app.use('/bundle.js', function (req, res) {
  return fs.createReadStream('./dist/bundle.js').pipe(res);
});

let initialState = {};
const store = configureStore(initialState);

// Components
function renderComponents(sData, rProps) {
  return(ReactDOMServer.renderToString(
    <Provider store={sData}>
       <ReduxAsyncConnect {...rProps}/>
    </Provider>)
  );
}

// Initial HTML
function initialPage(html, store) {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <meta charset="utf-8">
        <title>Mikey Universal App</title>
      </head>
      <body>
        <script>window.__INITIAL_STATE__ = ${stringify(store.getState())};</script>
        <div id="app">${html}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
}

// Server Side Rendering
app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log('Error: ' + error);
      res.status(500);
      let components = renderComponents(store, renderProps);
      setTimeout(() => {
        res.send(initialPage(components, store));
      }, 500);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const components = renderComponents(store, renderProps);
        res.status(200);
        setTimeout(() => {
          res.send(initialPage(components, store));
        }, 500);
      });

    } else {
      res.status(404).send('Not Found');

    }
  });
});

// Port
const PORT = process.env.PORT || 3000;
// App / Server Start
app.listen(PORT, (error) => {
  if (!error) {
    console.log('Server listening on: ' + PORT);
  }
});

export default app;
