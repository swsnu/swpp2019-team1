import axios from 'axios';
import { push } from 'connected-react-router';
import { message } from 'antd';
import moment from 'moment';

import * as actionTypes from './actionTypes';

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
      })
      .catch(() => {
        message.error('Wrong email or password');
      });
  };
};

// not yet implemented
const signOutAction = () => {
  return {
    type: actionTypes.SIGN_OUT,
  };
};

// not yet implemented
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
        // console.log(error.config);
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

const getUserAction = user => {
  return {
    type: actionTypes.GET_USER,
    user,
  };
};

export const getUser = id => {
  return dispatch => {
    return axios.get(`/api/user/${id}`).then(res => {
      const { data } = res;
      const { schedule } = data;
      const userInfo = {
        ...data,
        schedule: schedule.map(match => ({
          ...match,
          timeBegin: moment(match.timeBegin),
          timeEnd: moment(match.timeEnd),
          category: JSON.parse(match.category.indexes),
        })),
      };
      dispatch(getUserAction(userInfo));
    });
  };
};

// export const getUserList = () => null;

// const restoreUserAction = user => {
//   return {
//     type: actionTypes.SIGN_IN,
//     user,
//   };
// };

export const restoreUser = () => {
  return dispatch => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    dispatch(signInAction(currentUser));
  };
};
