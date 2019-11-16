import * as actionTypes from '../actions/actionTypes';

export const categories = [
  {
    value: 0,
    label: 'Movie',
    children: [
      {
        value: 0,
        label: 'SF',
      },
      {
        value: 1,
        label: 'Action',
      },
      {
        value: 2,
        label: 'Comedy',
      },
      {
        value: 3,
        label: 'Romance',
      },
    ],
  },
  {
    value: 1,
    label: 'Study',
    children: [
      {
        value: 0,
        label: 'Physics',
      },
      {
        value: 1,
        label: 'Biology',
      },
      {
        value: 2,
        label: 'Computer Science',
      },
      {
        value: 3,
        label: 'Mechanical Engineering',
      },
    ],
  },
];

const initialState = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: undefined,
  // the following may not be needed
  myMatch: [],
  category: '',
  location: '',
  title: '',
};

// const testInitialState = {
//   hot: [],
//   new: [],
//   recommend: [],
//   searchResult: [],
//   selected: {
//     id: 1,
//     hostId: 2,
//     title: 'TEST_TITLE',
//     time: 'TEST_TIME',
//     location: 'TEST_LOCATION',
//     hostName: 'TEST_HOSTNAME',
//     restriction: 'TEST_RESTRICTION',
//     additionalInfo: 'TEST_ADITIONALINFO',
//   },
//   myMatch: [],
// };

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
    case actionTypes.SEND_NLP_TEXT:
      return {
        ...state,
        category: action.category,
        location: action.location,
        title: action.title,
      };
    default:
      break;
  }
  return state;
};

export default matchReducer;
