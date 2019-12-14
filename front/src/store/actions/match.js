import axios from 'axios';
import { push } from 'connected-react-router';
import { message } from 'antd';
import moment from 'moment';
import * as actionTypes from './actionTypes';
import { categories } from '../staticData/categories';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const getMatchAction = match => {
  return { type: actionTypes.GET_MATCH, match };
};

export const getMatch = id => {
  return dispatch => {
    return (
      axios
        .get(`/api/match/${id}/`)
        .then(res => {
          const { data } = res;
          const { restrictedGender } = data;
          delete data.restrictedGender;
          const matchInfo = {
            ...data,
            timeBegin: moment(data.timeBegin),
            timeEnd: moment(data.timeEnd),
            restrictToMale: data.isGenderRestricted && !restrictedGender,
            restrictToFemale: data.isGenderRestricted && restrictedGender,
            isPeriodic: data.period !== 0,
            category: JSON.parse(data.category.indexes),
          };
          dispatch(getMatchAction(matchInfo));
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};

const getHotMatchAction = hot => {
  return { type: actionTypes.GET_HOT_MATCH, hot };
};

export const getHotMatch = () => {
  return dispatch => {
    return (
      axios
        .get('/api/match/hot/')
        .then(res => dispatch(getHotMatchAction(res.data)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};

const getNewMatchAction = newMatches => {
  return { type: actionTypes.GET_NEW_MATCH, newMatches };
};

export const getNewMatch = () => {
  return dispatch => {
    return (
      axios
        .get('/api/match/new/')
        .then(res => dispatch(getNewMatchAction(res.data)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};

const getRecommendMatchAction = recommend => {
  return { type: actionTypes.GET_RECOMMEND_MATCH, recommend };
};

export const getRecommendMatch = () => {
  return dispatch => {
    return (
      axios
        .get(`/api/match/recommend/`)
        .then(res => dispatch(getRecommendMatchAction(res.data)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};

const createMatchAction = () => {
  return {
    type: actionTypes.CREATE_MATCH,
  };
};

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export const createMatch = match => {
  const formData = new FormData();
  Object.keys(match).forEach(key => formData.append(key, match[key]));

  return dispatch => {
    return axios.post(`/api/match/`, formData, config).then(res => {
      dispatch(createMatchAction());
      dispatch(push(`/match/${res.data.id}`));
    });
  };
};

const CToACallback = (acc, ctgn) => {
  const { ctgs, array } = acc;
  const target = ctgs.filter(obj => obj.label === ctgn)[0];
  return { ctgs: target.children, array: array.concat([target.value]) };
};

const convertCategoryToArray = string => {
  if (!string) return null;
  const splited = string.substring(1).split('/');

  const result = splited.reduce(CToACallback, { ctgs: categories, array: [] });
  const { array } = result;
  if (result.ctgs) return array.concat([0]);
  return array;
};

const sendNlpTextAction = (category, location, title, nlpText) => {
  return {
    type: actionTypes.SEND_NLP_TEXT,
    category: convertCategoryToArray(category),
    location,
    title,
    additionalInfo: nlpText,
  };
};

export const sendNlpText = nlpText => {
  return dispatch => {
    return axios.post(`/api/match/nlp/`, { nlpText }).then(res => {
      dispatch(
        sendNlpTextAction(
          res.data.categories[0].name,
          res.data.locations[0].name,
          res.data.events[0].name,
          nlpText,
        ),
      );
      dispatch(push(`/match/create`));
    });
  };
};

const editMatchAction = () => {
  return {
    type: actionTypes.EDIT_MATCH,
  };
};

export const editMatch = (id, match) => {
  const formData = new FormData();
  Object.keys(match).forEach(key => formData.append(key, match[key]));

  return dispatch => {
    return axios.post(`/api/match/${id}/`, formData, config).then(() => {
      dispatch(editMatchAction());
      dispatch(push(`/match/${id}`));
    });
  };
};

// skeleton
const joinMatchAction = id => {
  return { type: actionTypes.JOIN_MATCH, id };
};

// skeleton
export const joinMatch = id => {
  return dispatch => {
    return (
      axios
        .post(`/api/match/${id}/join/`)
        .then(() => dispatch(joinMatchAction(id)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('Log in!');
          dispatch(push('/signin'));
        })
    );
  };
};

// skeleton
const quitMatchAction = id => {
  return { type: actionTypes.QUIT_MATCH, id };
};

// skeleton
export const quitMatch = id => {
  return dispatch => {
    return (
      axios
        .delete(`/api/match/${id}/join/`)
        .then(() => dispatch(quitMatchAction(id)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};

const searchMatchAction = searchResult => {
  return { type: actionTypes.SEARCH_MATCH, searchResult };
};

export const searchMatch = (query, time, location) => {
  let parameter = ``;
  if (query) {
    parameter += `?query=${query}`;
  }
  if (time) {
    parameter += `&time=${time}`;
  }
  if (location) {
    parameter += `&loc=${location}`;
  }
  return dispatch => {
    return (
      axios
        .get(`/api/match/search${parameter}`)
        .then(res => dispatch(searchMatchAction(res.data)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        } */
          // console.log(error.config);
          message.error('ERROR!');
        })
    );
  };
};
