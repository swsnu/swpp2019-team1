import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

const getMatch_ = match => {
  return { type: actionTypes.GET_MATCH, match };
};

export const getMatch = id => {
  return dispatch => {
    return axios
      .get(`/api/match/${id}`)
      .then(res => dispatch(getMatch_(res.data)));
  };
};

const getHotMatch_ = hot => {
  return { type: actionTypes.GET_HOT_MATCH, hot };
};

export const getHotMatch = () => {
  return dispatch => {
    return axios
      .get('/api/match/hot')
      .then(res => dispatch(getHotMatch_(res.data)));
  };
};

const getNewMatch_ = newmatch => {
  return { type: actionTypes.GET_NEW_MATCH, new: newmatch };
};

export const getNewMatch = () => {
  return dispatch => {
    return axios
      .get('/api/match/new')
      .then(res => dispatch(getNewMatch_(res.data)));
  };
};

const getRecommendMatch_ = recommend => {
  return { type: actionTypes.GET_Recommend_MATCH, recommend };
};

export const getRecommendMatch = id => {
  return dispatch => {
    return axios
      .get(`/api/match/recommend/${id}`)
      .then(res => dispatch(getRecommendMatch_(res.data)));
  };
};
