// Store Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import actionCreators from './js/actions/index';

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
  let logger = [];
  if (process.env.NODE_ENV === 'development') {
    enhancers.push(window.devToolsExtension ?
      window.devToolsExtension({ actionCreators }) : f => f
    );
    logger.push(createLogger({ level: 'info', collapsed: true }));
  }

  // Middleware
  const middleware = [
    thunkMiddleware,
    routerMiddleware(hashHistory),
    ...logger
  ];

  // Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware, ...logger),
      ...enhancers
    )
  );

  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  // Reducer Hot Reloading
  if(module.hot) {
    module.hot.accept('./js/reducers/', () => {
      const nextRootReducer = require('./js/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
