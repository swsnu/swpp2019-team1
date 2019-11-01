import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

const getMatchAction = match => {
  return { type: actionTypes.GET_MATCH, match };
};

export const getMatch = id => {
  return dispatch => {
    return axios
      .get(`/api/match/${id}`)
      .then(res => dispatch(getMatchAction(res.data)));
  };
};

const getHotMatchAction = hot => {
  return { type: actionTypes.GET_HOT_MATCH, hot };
};

export const getHotMatch = () => {
  return dispatch => {
    return axios
      .get('/api/match/hot')
      .then(res => dispatch(getHotMatchAction(res.data)));
  };
};

const getNewMatchAction = newMatches => {
  return { type: actionTypes.GET_NEW_MATCH, newMatches };
};

export const getNewMatch = () => {
  return dispatch => {
    return axios
      .get('/api/match/new')
      .then(res => dispatch(getNewMatchAction(res.data)));
  };
};

const getRecommendMatchAction = recommend => {
  return { type: actionTypes.GET_RECOMMEND_MATCH, recommend };
};

export const getRecommendMatch = () => {
  return dispatch => {
    return axios
      .get(`/api/match/recommend`)
      .then(res => dispatch(getRecommendMatchAction(res.data)));
  };
};

const createMatchAction = () => {
  return {
    type: actionTypes.CREATE_MATCH,
  };
};

export const createMatch = match => {
  return dispatch => {
    return axios.post(`/api/match/create`, match).then(() => {
      dispatch(createMatchAction());
      // later change this
      dispatch(push('/home'));
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
    return axios
      .post(`/api/match/${id}/join`)
      .then(() => dispatch(joinMatchAction(id)));
  };
};

// skeleton
const quitMatchAction = id => {
  return { type: actionTypes.QUIT_MATCH, id };
};

// skeleton
export const quitMatch = id => {
  return dispatch => {
    return axios
      .delete(`/api/match/${id}/join`)
      .then(() => dispatch(quitMatchAction(id)));
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
    return axios
      .get(`/api/search${parameter}`)
      .then(res => dispatch(searchMatchAction(res.data)));
  };
};
