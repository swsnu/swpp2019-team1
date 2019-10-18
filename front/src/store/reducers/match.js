import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATCH:
      return { ...state, selected: action.match };
    case actionTypes.GET_HOT_MATCH:
      return { ...state, hot: action.hot };
    case actionTypes.GET_NEW_MATCH:
      return { ...state, new: action.new };
    case actionTypes.GET_RECOMMEND_MATCHES:
      return { ...state, recommend: action.recommend };
    default:
      break;
  }
  return state;
};

export default reducer;
