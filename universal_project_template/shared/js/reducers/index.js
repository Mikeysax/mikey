import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
// Import Reducers



// Combine Reducers
const rootReducer = combineReducers({
  /*Imported Reducers Go Here*/
  reduxAsyncConnect,
  routing: routerReducer
});

export default rootReducer;
