// Server Dependencies
import Express from 'express';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import compression from 'compression';
import serialize from 'serialize-javascript';

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

const initialState = {};
const store = configureStore(initialState);

// Components
const renderComponents = (sData, rProps) => {
  return(renderToString(
    <Provider store={sData}>
       <ReduxAsyncConnect {...rProps}/>
    </Provider>)
  );
};


// Initial HTML
const initialPage = (html, store) => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <meta charset="utf-8">
        <title>Mikey Universal App</title>
      </head>
      <body>
        <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}; charSet="UTF-8"</script>
        <div id="app">${html}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
};

const renderError = error => {
  const pad = '&#32;&#32;&#32;&#32;';
  const errorTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre>${pad}${error.stack.replace(/\n/g, `<br>${pad}`)}</pre>` : '';
  return initialPage(`<h1>Server Error:</h1> ${errorTrace}`, {});
};

// Server Side Rendering
app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log('Error: ' + error);
      return res.status(500).end(renderError(error));

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const components = renderComponents(store, renderProps);
        res.status(200);
        res.send(initialPage(components, store));

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
