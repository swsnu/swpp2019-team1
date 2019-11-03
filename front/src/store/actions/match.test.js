import axios from 'axios';
import { message } from 'antd';
import * as actionCreators from './match';
import store, { history } from '../store';

const stubMatchRespFieldsA = {
  title: '',
  // matchThumbnail
  categoryId: 0,
  capacity: 0,
  isOnline: false,
  locationText: '',
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: '',
  // locationLongitude: '',
  timeBegin: new Date().toISOString(),
  timeEnd: new Date().toISOString(),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: false,
  restrictedGender: false,
};
const stubMatchRespA = { fields: stubMatchRespFieldsA };

const stubMatchRespFieldsB = {
  title: '',
  // matchThumbnail
  categoryId: 0,
  capacity: 0,
  isOnline: false,
  locationText: '',
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: '',
  // locationLongitude: '',
  timeBegin: new Date().toISOString(),
  timeEnd: new Date().toISOString(),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: true,
  restrictedGender: false,
};
const stubMatchRespB = { fields: stubMatchRespFieldsB };

const stubMatchA = {
  title: '',
  // matchThumbnail
  categoryId: 0,
  capacity: 0,
  isOnline: false,
  locationText: '',
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: '',
  // locationLongitude: '',
  timeBegin: new Date(stubMatchRespFieldsA.timeBegin),
  timeEnd: new Date(stubMatchRespFieldsA.timeEnd),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: false,
  restrictToMale: false,
  restrictToFemale: false,
};
const stubNew = { dummy: 'new' };
const stubHot = { dummy: 'hot' };
const stubRecommend = { dummy: 'recommend' };

const stubMatchPk = 2;

const stubNewMatch = {
  title: '',
  // matchThumbnail
  categoryId: 0,
  capacity: 0,
  isOnline: false,
  locationText: '',
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: '',
  // locationLongitude: '',
  timeStart: new Date(),
  timeEnd: new Date(),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
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
          data: JSON.stringify([stubMatchRespA]),
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getMatch(0)).then(() => {
      const newState = store.getState();
      expect(newState.match.selected).toStrictEqual(stubMatchA);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getMatch' should set restrictToMale, restrictToFemale correctly`, done => {
    jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: JSON.stringify([stubMatchRespB]),
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getMatch(0)).then(() => {
      const newState = store.getState();
      expect(newState.match.selected.restrictToMale).toBe(true);
      done();
    });
  });

  it(`'getMatch' should handle error correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.getMatch(0)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
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

  it(`'getNewMatch' should handle error correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.getNewMatch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
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

  it(`'getHotMatch' should handle error correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.getHotMatch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
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

  it(`'getRecommendMatch' should handle error correctly`, done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.getRecommendMatch(0)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
      done();
    });
  });

  it(`'createMatch' should request match create correctly and push on success`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: JSON.stringify([{ pk: stubMatchPk }]),
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

  it(`'editMatch' should request match create correctly and push on success`, done => {
    const spyPut = jest.spyOn(axios, 'put').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: JSON.stringify([{ pk: stubMatchPk }]),
        };
        resolve(result);
      });
    });
    const spyPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => path);
    store.dispatch(actionCreators.editMatch(stubNewMatch)).then(() => {
      expect(spyPut).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'joinMatch' should request match join correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.joinMatch(stubMatchPk)).then(() => {
      const newState = store.getState();
      expect(newState.match.myMatch[0]).toBe(stubMatchPk);
      expect(spyPost).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'joinMatch' should handle error correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.joinMatch(stubMatchPk)).then(() => {
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
      done();
    });
  });

  it(`'quitMatch' should quit match correctly`, done => {
    const spyDelete = jest.spyOn(axios, 'delete').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.quitMatch(stubMatchPk)).then(() => {
      const newState = store.getState();
      expect(newState.match.myMatch.length).toBe(0);
      expect(spyDelete).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'quitMatch' should handle error correctly`, done => {
    const spyDelete = jest.spyOn(axios, 'delete').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.quitMatch(stubMatchPk)).then(() => {
      expect(spyDelete).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
      done();
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
          `/api/match/search?query=${query}&time=${time}&loc=${location}`,
        );
        done();
      });
  });

  it(`'searchMatch' should handle error correctly`, done => {
    const query = 'query';
    const time = 'time';
    const location = 'location';
    const spyGet = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store
      .dispatch(actionCreators.searchMatch(query, time, location))
      .then(() => {
        expect(spyGet).toHaveBeenCalledTimes(1);
        expect(spyMessageError).toHaveBeenCalledWith('ERROR!');
        done();
      });
  });
});
