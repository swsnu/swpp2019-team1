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
    return (
      axios
        .post(`/api/signup`)
        .then(() => {
          dispatch(createUserAction());
          dispatch(push('/home'));
        })
        // eslint-disable-next-line no-alert
        .catch(() => message.error('Email is duplicated'))
    );
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
