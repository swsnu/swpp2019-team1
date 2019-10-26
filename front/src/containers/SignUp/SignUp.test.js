import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import SignUp from './SignUp';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';

const stubUser = {};
const stubMatch = {};
const mockStore = getMockStore(stubUser, stubMatch);

describe('<MatchDetail />', () => {
  let signUp;
  beforeEach(() => {
    signUp = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    const component = mount(signUp);
    let wrapper = component.find('.SignUp');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on email input`, () => {
    const email = 'test_email';
    const component = mount(signUp);
    const wrapper = component.find('#email-input');
    wrapper.simulate('change', { target: { value: email } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.email).toEqual(email);
  });

  it(`should set state properly on password input`, () => {
    const password = 'test_password';
    const component = mount(signUp);
    const wrapper = component.find('#password-input');
    wrapper.simulate('change', { target: { value: password } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.password).toEqual(password);
  });

  it(`should set state properly on passwordConfirm input`, () => {
    const passwordConfirm = 'test_password_confirm';
    const component = mount(signUp);
    const wrapper = component.find('#password-confirm-input');
    wrapper.simulate('change', { target: { value: passwordConfirm } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.passwordConfirm).toEqual(passwordConfirm);
  });

  it(`should set state properly on username input`, () => {
    const username = 'test_username';
    const component = mount(signUp);
    const wrapper = component.find('#username-input');
    wrapper.simulate('change', { target: { value: username } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.username).toEqual(username);
  });

  it(`should set state properly on firstName input`, () => {
    const firstName = 'test_first_name';
    const component = mount(signUp);
    const wrapper = component.find('#first-name-input');
    wrapper.simulate('change', { target: { value: firstName } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.firstName).toEqual(firstName);
  });

  it(`should set state properly on lastName input`, () => {
    const lastName = 'test_last_name';
    const component = mount(signUp);
    const wrapper = component.find('#last-name-input');
    wrapper.simulate('change', { target: { value: lastName } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.lastName).toEqual(lastName);
  });

  it(`should set state properly on phone input`, () => {
    const phone = 'test_phone';
    const component = mount(signUp);
    const wrapper = component.find('#phone-input');
    wrapper.simulate('change', { target: { value: phone } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.phone).toEqual(phone);
  });

  it(`should set state properly on gender input`, () => {
    let gender = true;
    const component = mount(signUp);
    let wrapper = component.find(
      'input[name="gender-radio-input"][value="male"]',
    );
    wrapper.simulate('change', { target: { value: 'male', checked: gender } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.gender).toEqual(gender);
    gender = false;
    wrapper = component.find(
      'input[name="gender-radio-input"][value="female"]',
    );
    wrapper.simulate('change', {
      target: { value: 'female', checked: gender },
    });
    expect(signUpInstance.state.gender).toEqual(gender);
  });

  it(`should set state properly on birthdate input`, () => {
    const birthdate = new Date(1995 - 10 - 3);
    const component = mount(signUp);
    const wrapper = component.find('#birthdate-input');
    wrapper.simulate('change', { target: { value: birthdate } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.birthdate).toEqual(birthdate);
  });

  it(`should set state properly on birthdate input`, () => {
    const birthdate = new Date(1995 - 10 - 3);
    const component = mount(signUp);
    const wrapper = component.find('#birthdate-input');
    wrapper.simulate('change', { target: { value: birthdate } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.birthdate).toEqual(birthdate);
  });

  it(`should call createUser() properly on submit`, () => {
    const spySignUp = jest
      .spyOn(actionCreators, 'createUser')
      .mockImplementation(() => {
        return () => {};
      });
    const component = mount(signUp);
    const wrapper = component.find('button');
    wrapper.simulate('click');
    expect(spySignUp).toHaveBeenCalledTimes(1);
  });
});
