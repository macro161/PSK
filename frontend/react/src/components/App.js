import { hot } from 'react-hot-loader';
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import { ConnectedRouter } from 'react-router-redux';
import Number from './Number'

const App = () => (
  <Provider store={store}>
      <Router history={history}>
          <Route path="/" component={Number}>
          </Route>
      </Router>
  </Provider>
);

export default hot(module)(App);