import axios from 'axios';
import { push } from 'connected-react-router';
import { message } from 'antd';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import { errorHandler } from './match';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const signInAction = user => {
  return {
    type: actionTypes.SIGN_IN,
    user,
  };
};

export const signIn = signInInfo => {
  return dispatch => {
    return axios
      .post('/api/user/signin/', signInInfo)
      .then(async res => {
        const { data } = res;
        await sessionStorage.setItem(
          'currentUser',
          JSON.stringify({
            ...data.user,
          }),
        );
        dispatch(signInAction(data.user));
        dispatch(push('/home'));
        sessionStorage.setItem('token', data.token);
      })
      .catch(() => {
        message.error('Wrong email or password');
      });
  };
};

const signOutAction = () => {
  return {
    type: actionTypes.SIGN_OUT,
  };
};

export const signOut = () => {
  return dispatch => {
    return axios
      .post('/api/user/signout/')
      .then(() => {
        sessionStorage.removeItem('currentUser');
        dispatch(signOutAction());
        dispatch(push('/signin'));
      })
      .catch(() => {
        message.error('Failed to set up request.');
      });
  };
};

const createUserAction = () => {
  return {
    type: actionTypes.CREATE_USER,
  };
};

export const createUser = signUpInfo => {
  return dispatch => {
    return axios
      .post(`/api/user/signup/`, signUpInfo)
      .then(() => {
        dispatch(createUserAction());
        dispatch(push('/signin'));
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message.error('Email is duplicated.');
        } else {
          errorHandler(error);
        }
      });
  };
};

const getUserAction = user => {
  return {
    type: actionTypes.GET_USER,
    user,
  };
};

export const getUser = id => {
  return dispatch => {
    return axios
      .get(`/api/user/${id}`)
      .then(res => {
        const { data } = res;
        const { schedule } = data;
        const userInfo = {
          ...data,
          schedule: schedule.map(match => ({
            ...match,
            timeBegin: moment(match.timeBegin),
            timeEnd: moment(match.timeEnd),
          })),
        };
        dispatch(getUserAction(userInfo));
      })
      .catch(errorHandler);
  };
};

const editUserAction = userInfo => {
  return {
    type: actionTypes.EDIT_USER,
    userInfo,
  };
};

export const editUser = (id, userInfo) => {
  return dispatch => {
    return axios
      .patch(`/api/user/${id}/`, userInfo)
      .then(() => {
        dispatch(editUserAction(userInfo));
        dispatch(push(`/profile/${id}`));
      })
      .catch(errorHandler);
  };
};

const editInterestAction = valueList => {
  return {
    type: actionTypes.EDIT_INTEREST,
    valueList,
  };
};

export const editInterest = (id, valueList) => {
  return dispatch => {
    return axios
      .put(`/api/user/${id}/interest/`, valueList)
      .then(() => {
        dispatch(editInterestAction(valueList));
      })
      .catch(errorHandler);
  };
};

export const restoreUser = () => {
  return dispatch => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    dispatch(signInAction(currentUser));
  };
};
