import { createStore, applyMiddleware, compose  } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = routerMiddleware(history);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware), applyMiddleware(thunk)));

export const history = createHistory();

export default store;