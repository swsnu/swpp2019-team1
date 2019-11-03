import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userid: null,
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
      return { ...state };
    // yet not implemented
    case actionTypes.SIGN_OUT:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default userReducer;
