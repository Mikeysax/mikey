// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

// Import Root Reducer
import rootReducer from './js/reducers/index';

// Import data/dummy data


// Object for Initial Data
const initialState = {
  /*Cars,
    Bikes,
    Trucks*/
};

const configureStore = () => {

  // For Dev Tools
  const enhancers = compose(
    // eslint-disable-next-line no-use-before-define
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const reduxRouterMiddleware = routerMiddleware(browserHistory);

  // Middle Ware Location
  let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);

  // Store
  const store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('./js/reducers/', () => {
      const nextRootReducer = require('./js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
