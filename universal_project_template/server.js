// Server Dependencies
import Express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Router Dependencies
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import routes from './shared/routes';

// Store Dependencies
import configureStore from './client/store';

// Lib
import fetchComponentData from './shared/lib/fetchComponentData';


// Initialize Express App
const app = new Express();

app.use('/bundle.js', function (req, res) {
  return fs.createReadStream('./dist/bundle.js').pipe(res);
});

// Initial HTML
const renderView = (html, initialState) => {
  return(`
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <meta charset="utf-8">
      <title>Mikey Universal App</title>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="application/javascript" src="/bundle.js"></script>
    </body>
  </html>
  `);
};

// For Server Error Rendering
const renderError = err => {
  const softTab = '&#160;&#160;&#160;&#160;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderView(`Server Error${errTrace}`, {});
};

// Server Side Rendering
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if(!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {

        const initialView = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const finalState = store.getState();

        res.set('Content-Type', 'text/html')
          .status(200)
          .end(renderView(initialView, finalState));
      })
      .catch((error) => next(error));

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
