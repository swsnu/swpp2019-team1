import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/match';

// jest.mock('../../components/HomeMatchTile/HomeMatchTile', () => {})

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
  hot: [testmatch],
  new: [],
  recommend: [],
};
const mockStore = getMockStore(stubUser, stubMatch);

describe('<HomePage />', () => {
  let homePage;
  let spyGetHotMatch;
  let spyGetNewMatch;
  let spyGetRecommendMatch;
  let spySendNlpText;

  beforeEach(() => {
    homePage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetHotMatch = jest
      .spyOn(actionCreators, 'getHotMatch')
      .mockImplementation(() => {
        return () => null;
      });
    spyGetNewMatch = jest
      .spyOn(actionCreators, 'getNewMatch')
      .mockImplementation(() => {
        return () => null;
      });
    spyGetRecommendMatch = jest
      .spyOn(actionCreators, 'getRecommendMatch')
      .mockImplementation(() => {
        return () => null;
      });
    spySendNlpText = jest
      .spyOn(actionCreators, 'sendNlpText')
      .mockImplementation(() => {
        return () => null;
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(homePage);
    const wrapper = component.find('.HomePage');
    expect(wrapper.length).toBe(1);
    expect(spyGetHotMatch).toBeCalledTimes(1);
    expect(spyGetNewMatch).toBeCalledTimes(1);
    expect(spyGetRecommendMatch).toBeCalledTimes(1);
  });

  it('should redirect to match detail when match clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(homePage);
    const wrapper = component.find('#HomeMatchPreviewTile');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1');
  });

  it('should redirect to match create when create button clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(homePage);
    const wrapper = component.find('#Home-create-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/create');
  });

  it('should redirect to search page when search button clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(homePage);
    const wrapper = component.find('#Home-search-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/search');
  });

  it('should handle input changes', async () => {
    const component = mount(homePage);
    // nlpText change
    const nlpText = 'TEST_NLP_TEXT';
    const wrapper = component.find(`#nlp-query-input-field`);
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: nlpText } });
    const createInstance = component.find(HomePage.WrappedComponent).instance();
    expect(createInstance.state.nlpText).toEqual(nlpText);
  });

  it('should handle button clicks', async () => {
    const component = mount(homePage);
    const wrapper = component.find('#nlp-query-button');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spySendNlpText).toBeCalledTimes(1);
  });
});
