import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../store/store';

const getMockReducer = jest.fn(initialState => (state = initialState) => {
  return state;
});

const getMockStore = (user, match) => {
  const mockUserReducer = getMockReducer(user);
  const mockMatchReducer = getMockReducer(match);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    match: mockMatchReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return mockStore;
};

export default getMockStore;
