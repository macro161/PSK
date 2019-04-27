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
import AdminHeader from './components/adminHeader/AdminHeader';



const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <UserManager /> </div>) }} />
        <Route exact path="/admin" render={() => { return (<div> <AdminHeader /> <Spinner /> <EmployeeScreen /> </div>) }} />
        <Route exact path="/usermanager" render={() => { return (<div> <Header /> <Spinner /> <OrgHeader /> <UserManager /> </div>) }} />
        <Route exact path="/admin/usermanager" render={() => { return (<div> <AdminHeader /> <Spinner /> <UserManager /> </div>) }} />
        {/*<Route exact path="/admin/travels" render={() => { return (<div> <AdminHeader /> <Spinner /> <EmployeeScreen /> </div>) }} />*/}
        <Route exact path="/admin/offices" render={() => { return (<div> <AdminHeader />  <Spinner /> <Offices /> </div>) }} />
        <Route exact path="/admin/stats" render={() => { return (<div> <AdminHeader /> <Spinner /> <Stats /> </div>) }} />
        <Route exact path="/stats" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <Stats /> </div>) }} />
        <Route exact path="/offices" render={() => { return (<div> <Header /> <OrgHeader /> <Spinner /> <Offices /> </div>) }} />
        <Route exact path="/travels" render={() => { return (<div><Header /> <Spinner /> <EmployeeScreen /></div>) }} />
        <Route exact path="/orgTravels" render={() => { return (<div><Header /> <OrgHeader /> <Spinner /> <TravelScreen /></div>) }} />
        <Route exact path="/login" render={() => { return (<div><Header />  <Spinner /> <LogIn/></div>)}}/>

        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
