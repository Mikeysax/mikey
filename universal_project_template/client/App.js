// Import Project Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS/SCSS
import '../shared/css/application.scss';

// Router Dependencies
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../shared/routes';

// Store Dependencies
import configureStore from './store';
const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

// Router
const router = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

// Render
ReactDOM.render(
  router, document.getElementById('app')
);
