import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import MatchDetail from './MatchDetail';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as userActionCreators from '../../../store/actions/user';
import * as matchActionCreators from '../../../store/actions/match';

const stubUser = {};
const stubMatch = {
  selected: {
    id: 1,
    hostId: 2,
    title: 'TEST_TITLE',
    time: 'TEST_TIME',
    location: 'TEST_LOCATION',
    hostName: 'TEST_HOSTNAME',
    restriction: 'TEST_RESTRICTION',
    additionalInfo: 'TEST_ADITIONALINFO',
  },
};
const mockStore = getMockStore(stubUser, stubMatch);

describe('<MatchDetail />', () => {
  let matchDetail;
  let spyGetMatch;
  let spyJoinMatch;
  let spyQuitMatch;
  beforeEach(() => {
    matchDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MatchDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMatch = jest
      .spyOn(matchActionCreators, 'getMatch')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyJoinMatch = jest
      .spyOn(matchActionCreators, 'joinMatch')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyQuitMatch = jest
      .spyOn(matchActionCreators, 'quitMatch')
      .mockImplementation(id => {
        return dispatch => {};
      });
  });

  it('should render without errors', () => {
    const component = mount(matchDetail);
    const wrapper = component.find('.MatchDetail');
    expect(wrapper.length).toBe(1);
  });

  it('should redirected to match edit page when edit button clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(matchDetail);
    const wrapper = component.find('#edit-match-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1/edit');
  });

  it('should redirected to user profile page when host clicked', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(matchDetail);
    const wrapper = component.find('.Detail-Host');
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
