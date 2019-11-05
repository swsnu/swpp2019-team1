import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import MatchDetail from './MatchDetail';
import getMockStore from '../../../test-utils/getMockStore';
import { history } from '../../../store/store';
import * as matchActionCreators from '../../../store/actions/match';

const stubUser = {};
const stubMatch = {
  selected: {
    id: 1,
    hostId: 2,
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONALINFO',
    // matchThumbnail
    category: 0,
    capacity: 0,
    isOnline: false,
    locationText: '',
    // latitude and longitude will be implemented or removed after applying Google Map API
    // locationLatitude: '',
    // locationLongitude: '',
    timeBegin: new Date(),
    timeEnd: new Date(),
    isPeriodic: false,
    period: 0,
    isAgeRestricted: false,
    restrictAgeFrom: 0,
    restrictAgeTo: 0,
    isGenderRestricted: false,
    restrictToMale: false,
    restrictToFemale: false,
  },
};
const stubMatchUndef = {
  match: { path: '/match/1/', url: '/match/1/' },
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreUndef = getMockStore(stubUser, stubMatchUndef);

describe('<MatchDetail />', () => {
  let matchDetail;
  let matchDetailUndef;
  let spyGetMatch;
  let spyJoinMatch;
  let spyQuitMatch;
  beforeEach(() => {
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

  it('should redirected to match edit page when edit button clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#edit-match-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1/edit');
  });

  it('should redirected to user profile page when host clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#host-profile-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/profile/2');
  });

  it('should call joinMatch when join button clicked', () => {
    const component = mount(matchDetail);
    const wrapper = component.find('#join-match-button');
    wrapper.simulate('click');
    expect(spyJoinMatch).toBeCalledTimes(1);
  });

  it('should call quitMatch when quit button clicked', () => {
    const component = mount(matchDetail);
    const wrapper = component.find('#quit-match-button');
    wrapper.simulate('click');
    expect(spyQuitMatch).toBeCalledTimes(1);
  });
});
