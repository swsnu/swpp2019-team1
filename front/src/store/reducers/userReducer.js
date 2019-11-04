import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userid: null,
  signedIn: 0,
};

// const testinitialState = {
//   userid: 1,
// };

const userReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState;
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state };
    // yet not implemented
    case actionTypes.SIGN_IN:
      return { ...state, signedIn: 1 };
    case actionTypes.SIGN_OUT:
      return { ...state, signedIn: 0 };
    default:
      break;
  }
  return state;
};

export default userReducer;
