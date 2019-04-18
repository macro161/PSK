import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Header from './components/header/Header';
import OrgHeader from './components/orgHeader/OrgHeader';
import UserManager from './components/adminPage/UserManager';
import Error from './components/Error';
import Stats from './components/statisticsPage/StatisticsScreen';
import Offices from './components/officePage/Offices';
import LogIn from './components/LogInPage/LogIn';
import EmployeeScreen from './components/employeeScreen/EmployeeScreen';
import TravelScreen from './components/TravelScreen/TravelScreen';
import Spinner from './components/Spinner';



const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <UserManager /> </div>) }} />
        <Route exact path="/usermanager" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <UserManager /> </div>) }} />
        <Route exact path="/stats" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <Stats /> </div>) }} />
        <Route exact path="/offices" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <Offices /> </div>) }} />
        <Route exact path="/travels" render={() => { return (<div><Header /> <Spinner /> <EmployeeScreen /></div>) }} />
        <Route exact path="/orgTravels" render={() => { return (<div><Header /> <Spinner /> <OrgHeader /> <TravelScreen /></div>) }} />
        <Route exact path="/login" render={() => { return (<div><Header /> <Spinner /> <LogIn/></div>)}}/>
        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
