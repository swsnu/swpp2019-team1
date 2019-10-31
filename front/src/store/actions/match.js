import axios from 'axios';
import { message } from 'antd';
// import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

const getMatchAction = match => {
  return { type: actionTypes.GET_MATCH, match };
};

export const getMatch = id => {
  return dispatch => {
    return (
      axios
        .get(`/api/match/${id}`)
        .then(res => dispatch(getMatchAction(res.data)))
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
        .get('/api/match/hot')
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
        .get('/api/match/new')
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
        .get(`/api/match/recommend`)
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

// skeleton
const joinMatchAction = id => {
  return { type: actionTypes.JOIN_MATCH, id };
};

// skeleton
export const joinMatch = id => {
  return dispatch => {
    return (
      axios
        .post(`/api/match/${id}/join`)
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
          message.error('ERROR!');
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
        .delete(`/api/match/${id}/join`)
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
        .get(`/api/search${parameter}`)
        .then(res => dispatch(searchMatchAction(res.data)))
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          /* if (error.response) {
          // TODO: error handling
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message.error('ERROR!');
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
