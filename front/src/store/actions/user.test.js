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
  phoneNumber: '',
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

  it(`If 'createUser' failed with response, it should alert that email is duplicated`, done => {
    const spyPostFail = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {
          response: {
            status: 500, // TODO: Implement error handling
            headers: '',
            data: '',
          },
        };
        reject(dummyError);
      });
    });

    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});

    store.dispatch(actionCreators.createUser(stubSignUpInfo)).then(() => {
      expect(spyPostFail).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('Email is duplicated.');
      done();
    });
  });

  it(`If 'createUser' failed without response, it should alert error`, done => {
    const spyPostFail = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {
          request: {},
        };
        reject(dummyError);
      });
    });

    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});

    store.dispatch(actionCreators.createUser(stubSignUpInfo)).then(() => {
      expect(spyPostFail).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('No response from server.');
      done();
    });
  });

  it(`If 'createUser' failed to set up request, it should alert error`, done => {
    const spyPostFail = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });

    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});

    store.dispatch(actionCreators.createUser(stubSignUpInfo)).then(() => {
      expect(spyPostFail).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
      done();
    });
  });

  it(`'signIn' should request signin correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.signIn()).then(() => {
      expect(spyPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'signOut' should request signout correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.signOut()).then(() => {
      expect(spyPost).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
