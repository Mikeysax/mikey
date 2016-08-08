// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import * as actionCreators from './js/actions/index';
// Dev Tools
import devTools from 'remote-redux-devtools';

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
  // Dev Tools
  let enhancers = [];
  if (process.env.NODE_ENV === 'development') {
    let dev_tools = window.devToolsExtension ?
    window.devToolsExtension(actionCreators) :
    noop => noop
    enhancers.push(dev_tools);
  }
  // Middleware
  const middleware = [
    thunkMiddleware,
    routerMiddleware(hashHistory)
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
    module.hot.accept('./js/reducers/', () => {
      const nextRootReducer = require('./js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  return store;
}
