// Import Project Dependencies
import React from 'react';
import { hydrate } from 'react-dom';

// Import All CSS/SCSS
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../shared/css/', true, /\.scss$/));

// Router Dependencies
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from '../shared/routes';

// Store Dependencies
import configureStore from './store';
const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

// Router
const router = (
  <Provider store={store} key="provider">
    <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={history}>
      {routes}
    </Router>
  </Provider>
);

// Render
ReactDOM.render(
  router, document.getElementById('app')
);
