import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import * as actionCreators from './match';
import store, { history } from '../store';

const stubMatchRespA = {
  title: '',
  category: [0, 0],
  categoryName: 'Adult / Adult',
  capacity: 0,
  isOnline: false,
  locationText: 'TEST_LOCATION_TEXT',
  timeBegin: moment().format(),
  timeEnd: moment().format(),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: false,
  restrictedGender: false,
};

const stubMatchRespB = {
  title: '',
  category: [0, 0],
  categoryName: 'Adult / Adult',
  capacity: 0,
  isOnline: false,
  locationText: 'TEST_LOCATION_TEXT',
  timeBegin: moment().format(),
  timeEnd: moment().format(),
  additionalInfo: '',
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: true,
  restrictedGender: false,
};

const stubMatchA = {
  title: '',
  category: [0, 0],
  categoryName: 'Adult / Adult',
  capacity: 0,
  isOnline: false,
  locationText: 'TEST_LOCATION_TEXT',
  timeBegin: moment(stubMatchRespA.timeBegin),
  timeEnd: moment(stubMatchRespA.timeEnd),
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
  matchThumbnail: null,
  category: [0, 0],
  categoryName: 'Adult / Adult',
  capacity: 0,
  isOnline: false,
  locationText: 'TEST_LOCATION_TEXT',
  timeBegin: moment(),
  timeEnd: moment(),
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
  let spyPush;
  beforeEach(() => {
    jest.clearAllMocks();
    spyPush = jest.spyOn(history, 'push').mockImplementation(path => path);
  });

  it(`'getMatch' should fetch match correctly`, async done => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubMatchRespA,
        };
        resolve(result);
      });
    });
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return [0, 0];
    });
    store.dispatch(actionCreators.getMatch(0)).then(async () => {
      const newState = store.getState();
      expect(newState.match.selected).toStrictEqual(stubMatchA);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    done();
  });

  it(`'getMatch' should set restrictToMale, restrictToFemale correctly`, done => {
    jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: stubMatchRespB,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getMatch(0)).then(() => {
      const newState = store.getState();
      expect(newState.match.selected.restrictToMale).toBe(false);
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
    store.dispatch(actionCreators.getMatch(0)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/home');
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
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
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
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
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
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
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

    store.dispatch(actionCreators.createMatch(stubNewMatch)).then(() => {
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'sendNlpText' should request nlp analysis correctly`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: {
            categories: [{ name: '/Adult' }],
            locations: [{ name: 'location' }],
            events: [{ name: 'event' }],
          },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.sendNlpText('analyze this')).then(() => {
      const newState = store.getState();
      expect(newState.match.category).toStrictEqual([0]);
      expect(newState.match.locationText).toBe('location');
      expect(newState.match.title).toBe('event');
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/match/create');
      done();
    });
  });

  it(`'sendNlpText' should request nlp analysis correctly w/o subcategory`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: {
            categories: [{ name: '/Arts & Entertainment' }],
            locations: [{ name: 'location' }],
            events: [{ name: 'event' }],
          },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.sendNlpText('analyze this')).then(() => {
      const newState = store.getState();
      expect(newState.match.category).toStrictEqual([1, 0]);
      expect(newState.match.locationText).toBe('location');
      expect(newState.match.title).toBe('event');
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/match/create');
      done();
    });
  });

  it(`'sendNlpText' should request nlp analysis correctly with empty category`, done => {
    const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: {
            categories: [{ name: '' }],
            locations: [{ name: 'location' }],
            events: [{ name: 'event' }],
          },
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.sendNlpText('analyze this')).then(() => {
      const newState = store.getState();
      expect(newState.match.category).toBe(null);
      expect(newState.match.locationText).toBe('location');
      expect(newState.match.title).toBe('event');
      expect(spyPost).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledWith('/match/create');
      done();
    });
  });

  it(`'editMatch' should request match create correctly and push on success`, done => {
    const spyPut = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: JSON.stringify([{ pk: stubMatchPk }]),
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.editMatch(1, stubNewMatch)).then(() => {
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
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
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
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
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
    const category = [1, 1];
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: [stubNew, stubHot],
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.searchMatch(query, category)).then(() => {
      const newState = store.getState();
      expect(newState.match.searchResult.length).toBe(2);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toBeCalledWith(
        `/api/match/search?query=${query}&category=1,1`,
      );
      done();
    });
  });

  it(`'searchMatch' should handle error correctly`, done => {
    const query = 'query';
    const category = null;
    const spyGet = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        const dummyError = {};
        reject(dummyError);
      });
    });
    const spyMessageError = jest
      .spyOn(message, 'error')
      .mockImplementation(() => {});
    store.dispatch(actionCreators.searchMatch(query, category)).then(() => {
      expect(spyGet).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('Failed to set up request.');
      done();
    });
  });

  it(`If 'searchMatch' failed without response, it should alert error`, done => {
    const spyGetFail = jest.spyOn(axios, 'get').mockImplementation(() => {
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

    store.dispatch(actionCreators.searchMatch('', null)).then(() => {
      expect(spyGetFail).toHaveBeenCalledTimes(1);
      expect(spyMessageError).toHaveBeenCalledWith('No response from server.');
      done();
    });
  });
});
