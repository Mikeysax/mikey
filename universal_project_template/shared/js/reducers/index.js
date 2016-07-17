import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import Reducers


// Combine Reducers
const rootReducer = combineReducers({/*Imported Reducers Go Here*/ routing: routerReducer });

export default rootReducer;
