import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import number from './number'

const rootReducer = combineReducers({ 
  routing: routerReducer, number
});

export default rootReducer;