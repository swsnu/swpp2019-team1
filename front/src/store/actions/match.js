import axios from 'axios';
// import { push } from 'connected-react-router';
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

const getNewMatchAction = newmatch => {
  return { type: actionTypes.GET_NEW_MATCH, new: newmatch };
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

export const getRecommendMatch = id => {
  return dispatch => {
    return axios
      .get(`/api/match/recommend/${id}`)
      .then(res => dispatch(getRecommendMatchAction(res.data)));
  };
};

export const joinMatch = id => {
  return () => {
    return axios.post(`/api/match/${id}/join`, null);
  };
};

export const quitMatch = id => {
  return () => {
    return axios.delete(`/api/match/${id}/join`);
  };
};
