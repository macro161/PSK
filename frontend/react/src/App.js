import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import EmployeeHeader from './components/header/EmployeeHeader'
import OrganiserHeader from './components/orgHeader/OrganiserHeader';
import UserManager from './components/adminPage/UserManager';
import Error from './components/Error';
import Stats from './components/statisticsPage/StatisticsScreen';
import Offices from './components/officePage/Offices';
import LogIn from './components/LogInPage/Login';
import EmployeeScreen from './components/employeeScreen/EmployeeScreen';
import TravelScreen from './components/TravelScreen/TravelScreen';
import Spinner from './components/Spinner';
import AdminHeader from './components/adminHeader/AdminHeader';



const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<div><Spinner /> <LogIn /> </div>) }} />

        <Route exact path="/admin" render={() => { return (<div> <AdminHeader /> <Spinner /> <TravelScreen /> </div>) }} />
        <Route exact path="/admin-travels" render={() => { return (<div> <AdminHeader /> <Spinner /> <EmployeeScreen /> </div>) }} /> {/* not sure if needed*/}
        <Route exact path="/admin-usermanager" render={() => { return (<div> <AdminHeader /> <Spinner /> <UserManager/> </div>) }} />
        <Route exact path="/admin-offices" render={() => { return (<div> <AdminHeader />  <Spinner /> <Offices /> </div>) }} />
        <Route exact path="/admin-stats" render={() => { return (<div> <AdminHeader /> <Spinner /> <Stats /> </div>) }} />

        <Route exact path="/organiser" render={() => { return (<div> <OrganiserHeader /> <Spinner /> <TravelScreen /> </div>) }} />
        <Route exact path="/organiser-travels" render={() => { return (<div> <OrganiserHeader /> <Spinner /> <EmployeeScreen /> </div>) }} />

        <Route exact path="/travels" render={() => { return (<div><EmployeeHeader /> <Spinner /> <EmployeeScreen /></div>) }} />

        <Route path="*" component={Error}/>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
