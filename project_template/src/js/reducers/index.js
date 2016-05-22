import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers


// combine reducers
const rootReducer = combineReducers({/*Reducers Go Here*/ routing: routerReducer });

export default rootReducer;
