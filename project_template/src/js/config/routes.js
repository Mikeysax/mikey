import React from 'react';
import Welcome from'../components/Welcome';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import {Route, IndexRoute} from'react-router';

export default (
  <Route path="/" component={ApplicationLayout}>
    <IndexRoute component={Welcome} />
  </Route>
);
