import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: null,
  // the following may not be needed
  myMatch: [],
};
// eslint-disable-next-line no-unused-vars
const testinitialState = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: {
    id: 1,
    hostId: 2,
    title: 'TEST_TITLE',
    time: 'TEST_TIME',
    location: 'TEST_LOCATION',
    hostName: 'TEST_HOSTNAME',
    restriction: 'TEST_RESTRICTION',
    additionalInfo: 'TEST_ADITIONALINFO',
  },
  myMatch: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATCH:
      return { ...state, selected: action.match };
    case actionTypes.GET_HOT_MATCH:
      return { ...state, hot: state.hot.concat(action.hot) };
    case actionTypes.GET_NEW_MATCH:
      return { ...state, new: state.new.concat(action.newMatches) };
    case actionTypes.GET_RECOMMEND_MATCH:
      return { ...state, recommend: state.recommend.concat(action.recommend) };
    case actionTypes.JOIN_MATCH:
      return { ...state, myMatch: state.myMatch.concat(action.id) };
    case actionTypes.QUIT_MATCH:
      return {
        ...state,
        myMatch: state.myMatch.filter(id => id !== action.id),
      };
    default:
      break;
  }
  return state;
};

export default reducer;
