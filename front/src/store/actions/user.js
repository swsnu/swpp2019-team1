import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';

const createUser_ = () => {
  return {
    type: actionTypes.CREATE_USER,
  };
};

export const createUser = input => {
  return dispatch => {
    return axios
      .post(`/api/signup`)
      .then(() => dispatch(createUser_()).then(push('/home')))
      .catch(() => alert('Email is duplicated'));
  };
};

/*
const getUserInfo_ = user => {
  return {
    type: actionTypes.GET_USER_INFO,
    user,
  };
};

export const getUserInfo = id => {
  return dispatch => {
    return axios
      .get(`/api/user/${id}`)
      .then(res => dispatch(getUserInfo_(res.data)))
  };
};
*/
