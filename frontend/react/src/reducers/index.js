import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'
import StatisticScreen from './StatisticsScreen'
import Offices from "./Offices"

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager, StatisticScreen, Offices
});

export default rootReducer;