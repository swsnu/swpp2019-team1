import React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import getMockStore from '../../test-utils/getMockStore';
import SearchBox from './SearchBox';
import { history } from '../../store/store';

const stubUser = {};
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
  },
  location: '301-408',
};
const stubMatchBlankLocation = {
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
  },
  location: '',
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreBlankLocation = getMockStore(stubUser, stubMatchBlankLocation);

describe('<SearchBox />', () => {
  let searchBox;
  let searchBoxWithoutOnPlacesChanged;
  let searchBoxBlankLocation;

  const stubMapInstance = {};
  const stubMapsApi = { places: {}, event: {} };

  const stubClearInstanceListeners = jest.fn(() => {});
  stubMapsApi.event.clearInstanceListeners = stubClearInstanceListeners;

  const stubGetPlaces = jest.fn(() => {});
  const stubSearchBox = jest.fn(() => ({
    addListener: jest.fn(() => {}),
    getPlaces: stubGetPlaces,
  }));
  stubMapsApi.places.SearchBox = stubSearchBox;

  const stubOnPlacesChanged = jest.fn(() => {});
  beforeEach(() => {
    searchBox = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchBox
                  map={stubMapInstance}
                  mapsApi={stubMapsApi}
                  onPlacesChanged={stubOnPlacesChanged}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    searchBoxWithoutOnPlacesChanged = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchBox
                  map={stubMapInstance}
                  mapsApi={stubMapsApi}
                  onPlacesChanged={null}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    searchBoxBlankLocation = (
      <Provider store={mockStoreBlankLocation}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchBox
                  map={stubMapInstance}
                  mapsApi={stubMapsApi}
                  onPlacesChanged={null}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render appropriately without errors', () => {
    const component = mount(searchBox);
    const wrapper = component.find('.SearchBox');
    expect(wrapper.length).toBe(1);
    expect(component.find('input').prop('placeholder')).toEqual('301-408');
  });

  it('should clear instance listeners when component will unmount', () => {
    const component = mount(searchBox);
    component
      .find(SearchBox.WrappedComponent)
      .instance()
      .componentWillUnmount();
    expect(stubClearInstanceListeners).toHaveBeenCalledTimes(1);
  });

  it('should call getPlaces when onPlacesChanged is not null', () => {
    const component = mount(searchBox);
    component
      .find(SearchBox.WrappedComponent)
      .instance()
      .onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(1);
  });

  it('should not call getPlaces when onPlacesChanged is null', () => {
    const component = mount(searchBoxWithoutOnPlacesChanged);
    component
      .find(SearchBox.WrappedComponent)
      .instance()
      .onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(0);
  });

  it('should render appropriately with blank location', () => {
    const component = mount(searchBoxBlankLocation);
    expect(component.find('input').prop('placeholder')).toEqual('Search');
  });
});
