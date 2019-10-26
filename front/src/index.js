/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import App from './App';

import userReducer from './store/reducers/user';
import matchReducer from './store/reducers/match';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  user: userReducer,
  match: matchReducer,
  router: connectRouter(history),
});

const logger = store => next => action => {
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  console.log('[Middleware] Next State', store.getState());
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk, routerMiddleware(history)),
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
