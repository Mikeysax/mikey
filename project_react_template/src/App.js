// Import Project Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Auto Import CSS/SCSS
require('fs').readdirSync('./css').map((file, key) => {
  require('./css/' + file);
});

// Router Dependencies
import { Router, browserHistory } from 'react-router';
import routes from './routes';

// Router
const router = (
    <Router history={browserHistory}>
      {routes}
    </Router>
);

// Render to index.html HTML element
ReactDOM.render(
  router, document.getElementById('app')
);
