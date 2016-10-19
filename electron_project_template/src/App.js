// Import Project Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS/SCSS
import 'bootstrap/dist/css/bootstrap.css';
// Import CSS/SCSS
require('fs').readdirSync('./css').map((file, key) => {
  require('./css/' + file);
});

// Router Dependencies
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

// Store Dependencies
import configureStore from './store';
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// Render to index.html HTML element
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
