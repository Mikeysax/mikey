// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

// Import Root Reducer
import rootReducer from '../shared/js/reducers/index';

// Dev Tools
import DevTools from '../shared/lib/devtools';

// Store
export default function configureStore(initialState = {}) {
  // For Dev Tools
  let enhancers = [];
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  // Middleware
  const middleware = [
    promiseMiddleware,
    thunkMiddleware,
    routerMiddleware(browserHistory)
  ];

  // Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('../shared/js/reducers/', () => {
      const nextRootReducer = require('../shared/js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
