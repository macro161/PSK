import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'
import StatisticScreen from './StatisticsScreen'

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager, StatisticScreen
});

export default rootReducer;