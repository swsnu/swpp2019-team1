/* eslint-disable no-unused-vars */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userid: null,
};

const testinitialState = {
  userid: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default reducer;
