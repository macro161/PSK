import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Number from './components/Number'
import PublicLayoutRoute from './Layouts/PublicLayout';

const App = () => (
  <Provider store={store}>
      <Router history={history}>
        <PublicLayoutRoute path="/" component={Number}/>
      </Router>
  </Provider>
);

export default hot(module)(App);