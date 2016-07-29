// Server Dependencies
import Express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import compression from 'compression';
import serialize from 'serialize-javascript';

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

app.use(compression());
app.use(Express.static(__dirname + '/dist'));

const initialState = {};
const store = configureStore(initialState);

// Server Side Rendering
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

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
