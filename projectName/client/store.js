// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import immutifyState from '../shared/lib/immutifyState';

// Import Root Reducer
import rootReducer from '../shared/js/reducers/index';

// Import data/dummy data


// Object for Initial Data
const initialState = immutifyState(window.__INITIAL_STATE__);

const configureStore = () => {

  // For Dev Tools
  const enhancers = compose(
    /* eslint-disable */
    window.devToolsExtension ? window.devToolsExtension() : f => f
    /* eslint-enable */
  );

  const reduxRouterMiddleware = routerMiddleware(browserHistory);

  // Middleware Location
  let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);

  // Store
  const store = createStoreWithMiddleware(rootReducer, initialState, enhancers);

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('../shared/js/reducers/', () => {
      const nextRootReducer = require('../shared/js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
