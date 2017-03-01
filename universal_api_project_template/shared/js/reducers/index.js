import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
// Import Reducers
// import example from './example';


// Combine Reducers
const rootReducer = combineReducers({
  /*example*/
  reduxAsyncConnect,
  routing: routerReducer
});

export default rootReducer;
