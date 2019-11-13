/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import App from './App';

import userReducer from './store/reducers/userReducer';
import matchReducer from './store/reducers/matchReducer';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  user: userReducer,
  match: matchReducer,
  router: connectRouter(history),
});

const logger = storeArg => next => action => {
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  console.log('[Middleware] Next State', storeArg.getState());
  return result;
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history))),
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
