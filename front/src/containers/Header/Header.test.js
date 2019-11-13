import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';

import getMockStore from '../../test-utils/getMockStore';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';
import Header from './Header';

const authenticatedUser = {
  currentUser: {
    id: 1,
  },
};
const anonymousUser = { currentUser: null };
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
  afterEach(() => {
    jest.clearAllMocks();
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
  it(`should redirect to SignUp when click signup button`, async () => {
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
    expect(spyHistoryPush).toHaveBeenCalledWith('/signup');
  });

  it(`should push profile when click profile button`, async () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {
        return null;
      });
    const component = mount(authenticatedHeader);
    let wrapper = component.find(Dropdown);
    wrapper.simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper = component.find(Menu.Item);
    wrapper.at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spyHistoryPush).toHaveBeenCalledWith('/profile/1');
  });

  it(`should call signOut() when click signout button`, async () => {
    const spySignOut = jest
      .spyOn(actionCreators, 'signOut')
      .mockImplementation(() => {
        return () => {};
      });
    const component = mount(authenticatedHeader);
    let wrapper = component.find(Dropdown);
    wrapper.simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper = component.find(Menu.Item);
    wrapper.at(1).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(spySignOut).toHaveBeenCalled();
  });

  /*
  xit(`should push home when click back button`, async () => {
    expect(getHeaderName('/home')).toBe('Matchmaker');
    expect(getHeaderName('/signup')).toBe('Sign Up');
    expect(getHeaderName('/signin')).toBe('Sign In');
    expect(getHeaderName('/search')).toBe('Search');
    expect(getHeaderName('/match/create')).toBe('Create new Match');
    expect(getHeaderName('/match/detail')).toBe('Match Detail');
  });
  
  xit(`should change title appropriately`, async done => {
    const spyGetName = jest
      .spyOn(Headers, 'getHeaderName')
      .mockImplementation(() => null);
    const pushPromise = new Promise(resolve => {
      history.push('/home');
      authenticatedHeader = (
        <Provider store={authenticatedMockStore}>
          <ConnectedRouter history={history}>
            <Header />
          </ConnectedRouter>
        </Provider>
      );
      resolve();
    });
    pushPromise.then(async () => {
      const component = render(authenticatedHeader);
      history.push('/signin');
      component.findByText('Matchmaker');
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(spyGetName).toHaveBeenCalledWith('/home');
      done();
    });
  }); */
});
