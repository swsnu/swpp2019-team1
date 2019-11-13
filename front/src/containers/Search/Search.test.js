import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Search from './Search';
import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/match';

const stubUser = {};
const testmatch = {
  id: 1,
  title: 'TestTitle',
  host: 'HostName',
  location: 'Test Location',
  time: '2019-11-12T06:29:50.304Z',
  numParticipants: 2,
  capacity: 4,
};
const stubMatch = {
  searchResult: [testmatch],
};
const stubMatchNoSearchResult = {
  searchResult: [],
};
const mockStore = getMockStore(stubUser, stubMatch);
const mockStoreNoSearchResult = getMockStore(stubUser, stubMatchNoSearchResult);

describe('<Search />', () => {
  let search;
  beforeEach(() => {
    search = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Search} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(search);
    const wrapper = component.find('.Search');
    expect(wrapper.length).toBe(1);
  });

  it('should render without errors when no results', () => {
    search = (
      <Provider store={mockStoreNoSearchResult}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Search} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(search);
    const wrapper = component.find('.SearchResult');
    expect(wrapper.text()).toBe('No Result');
    expect(wrapper.length).toBe(1);
  });

  it('should send search query correctly when search button clicked', () => {
    const spySearchMatch = jest
      .spyOn(actionCreators, 'searchMatch')
      .mockImplementation(() => {
        return () => {};
      });
    const component = mount(search);

    const query = 'query';
    const time = 'time';
    const location = 'location';
    let wrapper = component.find('#search-general-query-field');
    wrapper.simulate('change', { target: { value: query } });
    wrapper = component.find('#search-time-field');
    wrapper.simulate('change', { target: { value: time } });
    wrapper = component.find('#search-location-field');
    wrapper.simulate('change', { target: { value: location } });
    wrapper = component.find('#search-button');
    wrapper.simulate('click');
    expect(spySearchMatch).toHaveBeenCalledWith(query, time, location);
  });

  it('should redirect to match detail when match clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(search);
    const wrapper = component.find('#SearchMatchPreviewTile');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1');
  });
});
