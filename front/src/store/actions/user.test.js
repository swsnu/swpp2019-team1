import axios from 'axios';
import * as actionCreators from './user';
import store from '../store';

const stubUser = {
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

describe('ActionMatch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getMatch' should fetch user correctly`, done => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.createUser(stubUser)).then(() => {
      const newState = store.getState();
      expect(newState.user.selected).toBe(stubUser);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
