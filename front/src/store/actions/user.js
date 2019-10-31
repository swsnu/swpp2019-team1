import axios from 'axios';
import { push } from 'connected-react-router';
import { message } from 'antd';

import * as actionTypes from './actionTypes';

const createUserAction = () => {
  return {
    type: actionTypes.CREATE_USER,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const createUser = () => {
  return dispatch => {
    return axios
      .post(`/api/signup`)
      .then(() => {
        dispatch(createUserAction());
        dispatch(push('/home'));
      })
      .catch(error => {
        // TODO: error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message.error('Email is duplicated.');
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request);
          message.error('No response from server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
          message.error('Failed to set up request.');
        }
        // console.log(error.config);
      });
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
