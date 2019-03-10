import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'
import Stats from './StatisticsReducer'

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager, Stats
});

export default rootReducer;