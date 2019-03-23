import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'
import StatisticScreen from './StatisticsScreen'
import Offices from "./Offices"
import EmployeeScreen from './EmployeeScreen';
import OrgScreen from './OrgScreen';

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager, StatisticScreen, EmployeeScreen, Offices, OrgScreen
});

export default rootReducer;