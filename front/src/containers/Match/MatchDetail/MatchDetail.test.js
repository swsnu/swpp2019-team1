import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import MatchDetail from './MatchDetail';
import getMockStore from '../../../test-utils/getMockStore';
import { history } from '../../../store/store';
import * as matchActionCreators from '../../../store/actions/match';

const stubUser = {
  currentUser: {
    id: 1,
  },
};

const stubNoUser = {
  currentUser: null,
};

const stubUserNotHost = {
  currentUser: {
    id: 2,
  },
};
const stubMatch = {
  selected: {
    id: 1,
    hostUser: {
      id: 1,
      username: 'TEST_HOST_USER',
    },
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONAL_INFO',
    // matchThumbnail
    category: [0, 0],
    capacity: 2,
    isOnline: false,
    locationText: '',
    locationLatitude: 0,
    locationLongitude: 0,
    timeBegin: moment('2019-11-07T00:35:38.334Z'),
    timeEnd: moment(),
    isPeriodic: false,
    period: 0,
    isAgeRestricted: false,
    restrictAgeFrom: 0,
    restrictAgeTo: 0,
    isGenderRestricted: false,
    restrictToMale: false,
    restrictToFemale: false,
    numParticipants: 1,
    participants: [1],
  },
};

const stubMatchRestrictMale = {
  selected: {
    id: 1,
    hostUser: {
      id: 1,
      username: 'TEST_HOST_USER',
    },
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONAL_INFO',
    // matchThumbnail
    category: [0, 0],
    capacity: 2,
    isOnline: false,
    locationText: 'abc',
    locationLatitude: 0,
    locationLongitude: 0,
    timeBegin: moment('2019-11-07T12:35:38.334Z'),
    timeEnd: moment(),
    isPeriodic: true,
    period: 7,
    isAgeRestricted: true,
    restrictAgeFrom: 5,
    restrictAgeTo: 10,
    isGenderRestricted: true,
    restrictToMale: true,
    restrictToFemale: false,
    numParticipants: 2,
    participants: [1],
  },
};

const stubMatchRestrictFemale = {
  selected: {
    id: 1,
    hostUser: {
      id: 1,
      username: 'TEST_HOST_USER',
    },
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONAL_INFO',
    // matchThumbnail
    category: [0, 0],
    capacity: 2,
    isOnline: false,
    locationText: 'def',
    locationLatitude: 0,
    locationLongitude: 0,
    timeBegin: moment(),
    timeEnd: moment(),
    isPeriodic: false,
    period: 0,
    isAgeRestricted: false,
    restrictAgeFrom: 0,
    restrictAgeTo: 0,
    isGenderRestricted: true,
    restrictToMale: false,
    restrictToFemale: true,
    numParticipants: 1,
    participants: [1],
  },
};
const stubMatchUndef = {
  match: { path: '/match/1/', url: '/match/1/' },
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreUndef = getMockStore(stubUser, stubMatchUndef);
const mockStoreNotHost = getMockStore(stubUserNotHost, stubMatch);
const mockStoreNoUser = getMockStore(stubNoUser, stubMatch);
const mockStoreRestrictMale = getMockStore(stubUser, stubMatchRestrictMale);
const mockStoreRestrictFemale = getMockStore(stubUser, stubMatchRestrictFemale);

describe('<MatchDetail />', () => {
  let matchDetail;
  let matchDetailUndef;
  let matchDetailNotHost;
  let matchDetailNoUser;
  let matchDetailRestrictMale;
  let matchDetailRestrictFemale;
  let spyGetMatch;
  let spyJoinMatch;
  let spyQuitMatch;
  beforeEach(() => {
    jest.spyOn(window.location, 'reload').mockImplementation(() => {});
    const matchParams = {
      params: { id: 1 },
      path: '/match/:id/',
      url: '/match/1/',
    };
    matchDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    matchDetailUndef = (
      <Provider store={mockStoreUndef}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    matchDetailNotHost = (
      <Provider store={mockStoreNotHost}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    matchDetailNoUser = (
      <Provider store={mockStoreNoUser}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    matchDetailRestrictMale = (
      <Provider store={mockStoreRestrictMale}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    matchDetailRestrictFemale = (
      <Provider store={mockStoreRestrictFemale}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MatchDetail match={matchParams} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMatch = jest
      .spyOn(matchActionCreators, 'getMatch')
      .mockImplementation(() => {
        return () => {};
      });
    spyJoinMatch = jest
      .spyOn(matchActionCreators, 'joinMatch')
      .mockImplementation(() => {
        return () => {};
      });
    spyQuitMatch = jest
      .spyOn(matchActionCreators, 'quitMatch')
      .mockImplementation(() => {
        return () => {};
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(matchDetail);
    const wrapper = component.find('.MatchDetail');
    expect(wrapper.length).toBe(1);
    expect(spyGetMatch).toBeCalledTimes(1);
  });

  it('should render nothing but "Loading..." when selected is undefined', () => {
    const component = mount(matchDetailUndef);
    const wrapper = component.find('.MatchDetail');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('Loading...');
  });

  it('should render join button when no user', () => {
    const component = mount(matchDetailNoUser);
    const wrapper = component.find('#join-match-button');
    expect(wrapper.length).toBe(2);
  });

  it('should redirected to match edit page when edit button clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#edit-match-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1/edit');
  });

  it('should redirected to chat room page when host clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#enter-chatroom-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1/chatroom');
  });

  it('should redirected to user profile page when host clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#host-profile-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/profile/1');
  });

  it('should call joinMatch when join button clicked', () => {
    const component = mount(matchDetailNotHost);
    let wrapper = component.find('#join-match-button').at(0);
    wrapper.simulate('click');
    expect(spyJoinMatch).toBeCalledTimes(1);
    // wrapper = component.find('.Detail-PlaceDate');
    // expect(wrapper.text()).toBe('calendar_today09:35AM, 7th 11 2019storefront');
    wrapper = component.find('#detail-capacity');
    expect(wrapper.text()).toBe('person1/2');
  });

  it('should call quitMatch when quit button clicked', () => {
    const component = mount(matchDetailNotHost);
    const wrapper = component.find('#quit-match-button').at(0);
    wrapper.simulate('click');
    expect(spyQuitMatch).toBeCalledTimes(1);
  });

  it('should render appropriately at different inputs', () => {
    let component = mount(matchDetailRestrictMale);
    let wrapper = component.find('.Detail-Restrictions');
    expect(wrapper.text()).toBe('Females, Age 5 to 10[object Object]');
    // wrapper = component.find('.Detail-PlaceDate');
    // expect(wrapper.text()).toBe(
    //   'calendar_today09:35PM, 7th 11 2019The period is 7storefrontabc',
    // );
    wrapper = component.find('#detail-capacity');
    expect(wrapper.text()).toBe('person2/2 (Full)');
    component = mount(matchDetailRestrictFemale);
    wrapper = component.find('.Detail-Restrictions');
    expect(wrapper.text()).toBe('Males[object Object]');
  });
});
