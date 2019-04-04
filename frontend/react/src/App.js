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
import AdminHeader from './components/adminHeader/AdminHeader';


const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<div> <Header /> <OrgHeader /> <UserManager /> </div>) }} />
        <Route exact path="/admin" render={() => { return (<div> <AdminHeader /> <EmployeeScreen /> </div>) }} />
        <Route exact path="/usermanager" render={() => { return (<div> <Header /> <OrgHeader /> <UserManager /> </div>) }} />
        <Route exact path="/admin/usermanager" render={() => { return (<div> <AdminHeader /> <UserManager /> </div>) }} />
        {/*<Route exact path="/admin/travels" render={() => { return (<div> <AdminHeader /> <EmployeeScreen /> </div>) }} />*/}
        <Route exact path="/admin/offices" render={() => { return (<div> <AdminHeader /> <Offices /> </div>) }} />
        <Route exact path="/admin/stats" render={() => { return (<div> <AdminHeader /> <Stats /> </div>) }} />
        <Route exact path="/stats" render={() => { return (<div> <Header /> <OrgHeader /> <Stats /> </div>) }} />
        <Route exact path="/offices" render={() => { return (<div> <Header /> <OrgHeader /> <Offices /> </div>) }} />
        <Route exact path="/travels" render={() => { return (<div><Header /> <EmployeeScreen /></div>) }} />
        <Route exact path="/orgTravels" render={() => { return (<div><Header /> <OrgHeader /> <TravelScreen /></div>) }} />
        <Route exact path="/login" render={() => { return (<div><Header /> <LogIn/></div>)}}/>
        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
