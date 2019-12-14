import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { Form } from 'formik-antd';
import { Button } from 'antd';

import { act } from '@testing-library/react';
import SignIn from './SignIn';
import getMockStore from '../../../../test-utils/getMockStore';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/user';

const dummyUser = {};
const dummyMatch = {};
const mockStore = getMockStore(dummyUser, dummyMatch);

describe('<SignIn />', () => {
  let signIn;
  const dummyInput = {
    email: 'test@test.com',
    password: 'testtest1234!',
  };

  beforeEach(() => {
    signIn = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('should render without errors', () => {
    const component = mount(signIn);
    const wrapper = component.find('.SignIn');
    expect(wrapper.length).toBe(1);
  });

  it(`should not call signIn() with not validated input`, async () => {
    const spySignIn = jest
      .spyOn(actionCreators, 'signIn')
      .mockImplementation(() => {
        return () => {};
      });

    const component = mount(signIn);
    const wrapper = component.find(Form);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
      wrapper.simulate('submit');
    });
    expect(spySignIn).toHaveBeenCalledTimes(0);
  });

  it(`should call signIn() properly on submit`, async () => {
    const spySignIn = jest
      .spyOn(actionCreators, 'signIn')
      .mockImplementation(() => {
        return () => {};
      });

    const component = mount(signIn);
    const signInInstance = component.find(SignIn.WrappedComponent).instance();

    let wrapper = component.find('Input');

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
      wrapper.at(0).prop('onChange')({
        target: { name: 'email', value: dummyInput.email },
      });
      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
      wrapper.at(1).prop('onChange')({
        target: { name: 'password', value: dummyInput.password },
      });

      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
      wrapper.simulate('submit');
      await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
    });

    expect(signInInstance.state).toEqual(dummyInput);
    expect(spySignIn).toHaveBeenCalledWith(dummyInput);
  });

  it(`should redirect to SignUp when click sign up button`, async () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {
        return null;
      });
    const component = mount(signIn);
    const wrapper = component.find(Button);
    await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
    wrapper.at(1).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100)).catch(() => {});
    expect(spyHistoryPush).toHaveBeenCalledWith('/signup');
  });
});
