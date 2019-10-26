import axios from 'axios';
import * as actionCreators from './match';
import store from '../store';

const stubMatchA = { dummy: 'dummy' };
const stubNew = { dummy: 'new' };
const stubHot = { dummy: 'hot' };
const stubRecommend = { dummy: 'recommend' };

const stubMatchId = 2;

// eslint-disable-next-line no-unused-vars
const stubMatch = {
  hot: [],
  new: [],
  recommend: [],
  searchResult: [],
  selected: null,
};

describe('ActionMatch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getMatch' should fetch match correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubMatchA,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getMatch(0)).then(() => {
      const newState = store.getState();
      expect(newState.match.selected).toBe(stubMatchA);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'getNewMatch' should fetch new match correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubNew,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getNewMatch()).then(() => {
      const newState = store.getState();
      expect(newState.match.new[0]).toBe(stubNew);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'getHotMatch' should fetch hot match correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubHot,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getHotMatch()).then(() => {
      const newState = store.getState();
      expect(newState.match.hot[0]).toBe(stubHot);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'getRecommendMatch' should fetch recommend match correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubRecommend,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getRecommendMatch()).then(() => {
      const newState = store.getState();
      expect(newState.match.recommend[0]).toBe(stubRecommend);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'joinMatch' should request match join and quit correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    const spyDelete = jest.spyOn(axios, 'delete').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.joinMatch(stubMatchId)).then(() => {
      let newState = store.getState();
      expect(newState.match.myMatch[0]).toBe(stubMatchId);
      expect(spyPost).toHaveBeenCalledTimes(1);
      store.dispatch(actionCreators.quitMatch(stubMatchId)).then(() => {
        newState = store.getState();
        expect(newState.match.myMatch.length).toBe(0);
        expect(spyDelete).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
