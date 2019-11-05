import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { Button, PageHeader } from 'antd';

import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';
import Header from './Header';

const authenticatedUser = { signedIn: 1 };
const anonymousUser = { signedIn: 0 };
const dummyMatch = {};
const authenticatedMockStore = getMockStore(authenticatedUser, dummyMatch);
const anonymousMockStore = getMockStore(anonymousUser, dummyMatch);

describe('<Header />', () => {
  let anonymousHeader;
  let authenticatedHeader;
  beforeEach(() => {
    anonymousHeader = (
      <Provider store={anonymousMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Header} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    authenticatedHeader = (
      <Provider store={authenticatedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Header} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  it('should render without errors', () => {
    const component = mount(authenticatedHeader);
    const wrapper = component.find('.Header');
    expect(wrapper.length).toBe(1);
  });

  it(`should redirect to SignIn when click signin button`, async () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {
        return null;
      });
    const component = mount(anonymousHeader);
    const wrapper = component.find(Button);
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper.at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spyHistoryPush).toHaveBeenCalledWith('/signin');
  });
  it(`should redirect to Home when click home button while anonymous`, async () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {
        return null;
      });
    const component = mount(anonymousHeader);
    const wrapper = component.find(Button);
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper.at(1).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spyHistoryPush).toHaveBeenCalledWith('/home');
  });
  it(`should redirect to Home when click home button while authenticated`, async () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {
        return null;
      });
    const component = mount(authenticatedHeader);
    const wrapper = component.find(Button);
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper.at(1).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spyHistoryPush).toHaveBeenCalledWith('/home');
  });

  it(`should call signOut() when click signout button`, async () => {
    const spySignOut = jest
      .spyOn(actionCreators, 'signOut')
      .mockImplementation(() => {
        return () => {};
      });
    const component = mount(authenticatedHeader);
    const wrapper = component.find(Button);
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper.at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spySignOut).toHaveBeenCalled();
  });

  it(`should prevent history.back by setting onBack()`, async () => {
    const component = mount(authenticatedHeader);
    const wrapper = component.find(PageHeader);
    expect(wrapper.props('onBack').onBack()).toBe(null);
  });
});
