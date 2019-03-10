import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Number from './components/Number'
import Header from './components/header/Header';
import UserManager from './components/adminPage/UserManager';
import Error from './components/Error';
import Stats from './components/statisticsPage/statisticsPage';



const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<div> <Header /> <Number /> </div>) }} />
        <Route exact path="/usermanager" render={() => { return (<div> <Header /> <UserManager /> </div>) }} />
        <Route exact path="/stats" render={() => { return (<div> <Header /> <Stats /> </div>) }} />
        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);