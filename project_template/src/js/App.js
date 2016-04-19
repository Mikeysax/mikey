import '../css/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
import $ from 'jquery';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import history from './helpers/history';
import ReduxPromise from 'redux-promise';


const reduxApp = combineReducers({
  form: formReducer
});

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reduxApp);

const dispatch = (action) => {
  store.dispatch(action);
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}><Router history={history}>{routes}</Router></Provider>,
    document.getElementById("app")
  );
};

$(function() {
  render();
  store.subscribe(render);
});
