import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'
import StatisticScreen from './StatisticsScreen'
import EmployeeScreen from './EmployeeScreen';

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager, StatisticScreen, EmployeeScreen
});

export default rootReducer;