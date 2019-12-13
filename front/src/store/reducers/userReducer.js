import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  selectedUser: null,
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState;
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state };
    // yet not implemented
    case actionTypes.SIGN_IN:
      return {
        ...state,
        currentUser: action.user,
      };
    case actionTypes.SIGN_OUT:
      return { ...state, currentUser: null };
    case actionTypes.GET_USER:
      return { ...state, selectedUser: action.user };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.userInfo },
        selectedUser: { ...state.selectedUser, ...action.userInfo },
      };
    case actionTypes.EDIT_INTEREST:
      return {
        ...state,
        currentUser: { ...state.currentUser, interests: action.valueList },
        selectedUser: { ...state.selectedUser, interests: action.valueList },
      };
    default:
      break;
  }
  return state;
};

export default userReducer;
