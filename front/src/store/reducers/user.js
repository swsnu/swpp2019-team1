import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userid: null,
};

const testInitialState = {
  userid: 1,
};

const reducer = (state = testInitialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return { ...state };
    default:
      break;
  }
  return state;
};
export default reducer;
