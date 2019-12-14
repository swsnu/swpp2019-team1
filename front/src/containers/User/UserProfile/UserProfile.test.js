import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Cascader } from 'antd';
import moment from 'moment';
import axios from 'axios';

import UserProfile from './UserProfile';
import getMockStore from '../../../test-utils/getMockStore';
import { history } from '../../../store/store';

const stubUser = {
  selectedUser: {
    id: 1,
    email: 'TEST_EMAIL@test.com',
    username: 'TEST_UN',
    firstName: 'TEST_FN',
    lastName: 'TEST_LN',
    phoneNumber: '010-1234-5678',
    profilePicture: 'TEST_PROFILE_PICTURE',
    gender: true,
    birthdate: moment().format(),
    message: 'TEST_MESSAGE',
    schedule: [],
    interests: [],
  },
  currentUser: {
    id: 1,
  },
};

const stubFemaleUser = {
  selectedUser: {
    id: 1,
    email: 'TEST_EMAIL@test.com',
    username: 'TEST_UN',
    firstName: 'TEST_FN',
    lastName: 'TEST_LN',
    phoneNumber: '010-1234-5678',
    profilePicture: 'TEST_PROFILE_PICTURE',
    gender: false,
    birthdate: moment().format(),
    message: 'TEST_MESSAGE',
    schedule: [],
    interests: [],
  },
  currentUser: {
    id: 1,
  },
};

const stubNoUser = {
  selectedUser: null,
  currentUser: {
    id: 1,
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
    // locationLatitude: '',
    // locationLongitude: '',
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
  },
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreFemaleUser = getMockStore(stubFemaleUser, stubMatch);
const mockStoreNoUser = getMockStore(stubNoUser, stubMatch);

describe('<UserProfile />', () => {
  let userProfile;
  let userProfileFemaleUser;
  let userProfileNoUser;
  let spyPut;
  let spyGet;
  let spyHistoryPush;
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(() => {});
    const userParams = {
      params: { id: 1 },
      path: '/profile/:id/',
      url: '/profile/1/',
    };
    userProfile = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <UserProfile match={userParams} history={history} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    userProfileFemaleUser = (
      <Provider store={mockStoreFemaleUser}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <UserProfile match={userParams} history={history} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    userProfileNoUser = (
      <Provider store={mockStoreNoUser}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <UserProfile match={userParams} history={history} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGet = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 201,
          data: {
            ...stubUser.selectedUser,
          },
        };
        resolve(result);
      });
    });
    spyPut = jest.spyOn(axios, 'put').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 201,
        };
        resolve(result);
      });
    });
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(userProfile);
    const wrapper = component.find('.UserProfile');
    expect(wrapper.length).toBe(1);
    expect(spyGet).toBeCalledTimes(1);
  });

  it('should render without errors when user is female', () => {
    const component = mount(userProfileFemaleUser);
    const wrapper = component.find('.UserProfile');
    expect(wrapper.length).toBe(1);
    expect(spyGet).toBeCalledTimes(1);
  });

  it('should redirected to profile edit page when edit button clicked', async () => {
    const component = mount(userProfile);
    await new Promise(resolve => setTimeout(resolve, 100));

    const wrapper = component.find('#edit-profile-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/profile/1/edit');
  });

  it('should change interests when interests changed', async () => {
    const component = mount(userProfile);
    let wrapper = component.find('.ant-tabs-tab');
    wrapper.at(1).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));

    wrapper = component.find(Cascader);
    expect(wrapper.length).toBe(3);

    wrapper.at(0).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);
    wrapper.at(1).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);
    wrapper.at(2).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);

    const instance = component.find(UserProfile.WrappedComponent).instance();
    instance.onClickEditInterest();
    expect(instance.state.isEdit).toBe(true);
    instance.onClickEditInterest();
    expect(instance.state.isEdit).toBe(false);
    expect(spyPut).toBeCalledTimes(1);
  });

  it('should render nothing when selectedUser is null', async () => {
    spyGet = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const error = {
          response: {
            status: 401,
          },
        };
        reject(error);
      });
    });
    const component = mount(userProfileNoUser);
    await new Promise(resolve => setTimeout(resolve, 100));

    const wrapper = component.find('.UserProfile');
    expect(wrapper.length).toBe(0);
  });
});
