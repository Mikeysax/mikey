// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

// Import Root Reducer
import rootReducer from './js/reducers/index';

// Import Data/Dummy Data

// Object for Initial Data
const initialState = {
  /*Cars,
    Bikes,
    Trucks*/
};

export default function configureStore() {
  // For Dev Tools
  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

  // Middleware
  const middleware = [
    thunkMiddleware,
    routerMiddleware(browserHistory)
  ];

  // Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devTools
    )
  );

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('./js/reducers/', () => {
      const nextRootReducer = require('./js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
