import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('<SignInForm />', () => {
  let signInForm;
  let mockClickSignInHandler;
  let mockClickSignUpHandler;
  let mockChangeEmailHandler;
  let mockChangePasswordHandler;
  const mockSignInState = {
    email: '',
    password: '',
  };

  beforeEach(() => {
    mockClickSignInHandler = jest.fn();
    mockClickSignUpHandler = jest.fn();
    mockChangeEmailHandler = jest.fn();
    mockChangePasswordHandler = jest.fn();
    signInForm = (
      <SignInForm
        email={mockSignInState.email}
        password={mockSignInState.password}
        onEmailChange={mockChangeEmailHandler}
        onPasswordChange={mockChangePasswordHandler}
        clickSignIn={mockClickSignInHandler}
        clickSignUp={mockClickSignUpHandler}
      />
    );
  });
  it('should render without errors', () => {
    const component = mount(signInForm);
    const wrapper = component.find('.SignInForm');
    expect(wrapper.length).toBe(1);
  });
  it('should call clickSignUp() on click SignUp button', async () => {
    const component = mount(signInForm);
    const wrapper = component.find('.SignUpButton');
    await new Promise(resolve => setTimeout(resolve, 100));

    wrapper.at(0).simulate('click');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockClickSignUpHandler).toHaveBeenCalled();
  });

  it('should call onEmailChange() on email change', async () => {
    const component = mount(signInForm);
    const wrapper = component.find('Input');
    await new Promise(resolve => setTimeout(resolve, 100));
    await act(async () => {
      wrapper.at(0).prop('onChange')({
        target: { name: 'email', value: 'a' },
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(mockChangeEmailHandler).toHaveBeenCalled();
  });

  it('should call onPasswordChange() on email change', async () => {
    const component = mount(signInForm);
    const wrapper = component.find('Input');
    await new Promise(resolve => setTimeout(resolve, 100));
    await act(async () => {
      wrapper.at(1).prop('onChange')({
        target: { name: 'password', value: 'a' },
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(mockChangePasswordHandler).toHaveBeenCalled();
  });
});
