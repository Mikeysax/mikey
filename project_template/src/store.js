// store dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './js/reducers/index';

// import data


// object for the initial data
const initialState = {
  /*Cars,
    Bikes,
    Trucks*/
};

// for redux dev tools, thunk, and other enhancers
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

// the redux store
const store = createStore(rootReducer, initialState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

// for reducer hot reloading
if(module.hot) {
  module.hot.accept('./js/reducers/', () => {
    const nextRootReducer = require('./js/reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
