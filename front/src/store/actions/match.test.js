import axios from 'axios';
import * as actionCreators from './match';
import store, { history } from '../store';

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

const stubNewMatch = {
  title: '',
  // matchThumbnail
  categoryID: 0,
  maxCapacity: 0,
  isOnline: false,
  locationText: '',
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: '',
  // locationLongitude: '',
  timeStart: new Date(),
  timeEnd: new Date(),
  additionalInfo: '',
  isPeriodic: false,
  interval: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: false,
  restrictToMale: false,
  restrictToFemale: false,
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
          data: [stubNew],
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
          data: [stubHot],
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
          data: [stubRecommend],
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

  // change destination later from /home to detail page
  it(`'createMatch' should request match create correctly and push /home on success`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    const spyPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => path);
    store.dispatch(actionCreators.createMatch(stubNewMatch)).then(() => {
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
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
  it(`'searchMatch' with no query should display 'No Results'`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: [],
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.searchMatch()).then(() => {
      const newState = store.getState();
      expect(newState.match.searchResult.length).toBe(0);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it(`'searchMatch' with query should display proper result`, done => {
    const query = 'query';
    const time = 'time';
    const location = 'location';
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: [stubNew, stubHot],
        };
        resolve(result);
      });
    });

    store
      .dispatch(actionCreators.searchMatch(query, time, location))
      .then(() => {
        const newState = store.getState();
        expect(newState.match.searchResult.length).toBe(2);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith(
          `/api/search?query=${query}&time=${time}&loc=${location}`,
        );
        done();
      });
  });
});
