import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userid: null,
  isSignedIn: 0,
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState;
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state };
    // yet not implemented
    case actionTypes.SIGN_IN:
      return { ...state, isSignedIn: 1, userid: action.id };
    case actionTypes.SIGN_OUT:
      return { ...state, isSignedIn: 0 };
    default:
      break;
  }
  return state;
};

export default userReducer;
