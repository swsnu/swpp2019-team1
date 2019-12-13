import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  it('should render without errors', () => {
    const dummySignUpState = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: undefined,
      birthdate: '',
    };
    const signUpForm = (
      <SignUpForm
        email={dummySignUpState.email}
        password={dummySignUpState.password}
        passwordConfirm={dummySignUpState.passwordConfirm}
        username={dummySignUpState.username}
        firstName={dummySignUpState.firstName}
        lastName={dummySignUpState.lastName}
        phoneNumber={dummySignUpState.phoneNumber}
        gender={dummySignUpState.gender}
        birthdate={dummySignUpState.birthdate}
        clickSubmit={() => null}
      />
    );
    const component = shallow(signUpForm);
    const wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });
});
