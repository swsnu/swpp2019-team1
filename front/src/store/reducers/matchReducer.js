import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: undefined,
  myMatch: [],
  category: null,
  location: '',
  title: '',
  additionalInfo: '',
};

const matchReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState;
  switch (action.type) {
    case actionTypes.GET_MATCH: {
      return { ...state, selected: action.match };
    }
    case actionTypes.GET_HOT_MATCH:
      return { ...state, hot: action.hot };
    case actionTypes.GET_NEW_MATCH:
      return { ...state, new: action.newMatches };
    case actionTypes.GET_RECOMMEND_MATCH:
      return { ...state, recommend: action.recommend };
    case actionTypes.JOIN_MATCH:
      return { ...state, myMatch: state.myMatch.concat(action.id) };
    case actionTypes.QUIT_MATCH:
      return {
        ...state,
        myMatch: state.myMatch.filter(id => id !== action.id),
      };
    case actionTypes.SEARCH_MATCH:
      return {
        ...state,
        searchResult: action.searchResult,
      };
    case actionTypes.EDIT_MATCH:
      return {
        ...state,
        selected: action.match,
      };
    case actionTypes.SEND_NLP_TEXT:
      return {
        ...state,
        category: action.category,
        locationText: action.locationText,
        title: action.title,
        additionalInfo: action.additionalInfo,
      };
    default:
      break;
  }
  return state;
};

export default matchReducer;
