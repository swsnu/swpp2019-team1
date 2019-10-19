import axios from 'axios';
import { message } from 'antd';

import * as actionCreators from './user';
import store, { history } from '../store';

const stubSignUpInfo = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  gender: null,
  birthdate: null,
};

describe('User Actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`If 'createUser' successed, it should push /home`, done => {
    const spyPostSuccess = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 201,
        };
        resolve(result);
      });
    });
    const spyPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => path);
    store.dispatch(actionCreators.createUser(stubSignUpInfo)).then(() => {
      expect(spyPostSuccess).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`If 'createUser' failed, it should alert that email is duplicated`, done => {
    const spyPostFail = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const result = {
          status: 500, // TODO: Implement check email duplication button
        };
        reject(result);
      });
    });
    const spyAlert = jest.spyOn(message, 'error').mockImplementation(() => {});
    store.dispatch(actionCreators.createUser(stubSignUpInfo)).then(() => {
      expect(spyPostFail).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
