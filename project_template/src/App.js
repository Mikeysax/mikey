// Import Project Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS/SCSS
import './css/application.scss';

// Import Container / Components for Routing
import ApplicationLayout from './js/components/ApplicationLayout';
import Welcome from './js/components/Welcome';
import NotFound from './js/components/NotFound';

// Router Dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

// Store Dependencies
import configureStore from './store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Router
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ApplicationLayout}>
        <IndexRoute component={Welcome} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>
);

// Render to HTML element
ReactDOM.render(
  router, document.getElementById('app')
);
