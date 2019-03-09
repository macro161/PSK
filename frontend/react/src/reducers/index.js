import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'
import UserManager from './UserManager'

const rootReducer = combineReducers({ 
  routing: routerReducer, number, UserManager
});

export default rootReducer;