import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Cascader } from 'antd';

import Search from './Search';
import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/match';

const stubUser = {};
const testmatch = {
  id: 1,
  title: 'TestTitle',
  hostUser: {
    id: 1,
    username: 'TEST_HOST_USER',
  },
  locationText: 'Test Location',
  timeBegin: '2019-11-12T06:29:50.304Z',
  timeEnd: '2019-11-12T06:29:50.304Z',
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
    const categoryOption = {
      value: [1, 0],
      selectedOptions: [
        { value: 1, label: 'Arts & Entertainment', children: Array(14) },
        { value: 0, label: 'other*' },
      ],
    };
    const query = 'query';
    let wrapper = component.find('#search-general-query-field');
    wrapper.simulate('change', { target: { value: query } });
    wrapper = component.find(Cascader);
    wrapper.prop('onChange')(
      categoryOption.value,
      categoryOption.selectedOptions,
    );
    wrapper.simulate(
      'change',
      categoryOption.value,
      categoryOption.selectedOptions,
    );

    wrapper = component.find('#search-button').at(1);
    wrapper.simulate('click');
    expect(spySearchMatch).toHaveBeenCalledTimes(1);
  });

  it('should redirect to match detail when match clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(search);
    const wrapper = component.find('.SearchMatchPreviewTile');
    wrapper.at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1');
  });
});
