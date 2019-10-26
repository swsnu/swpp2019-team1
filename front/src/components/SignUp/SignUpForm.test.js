import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  it('should render without errors', () => {
    const stubProps = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      gender: true,
      birthdate: new Date(2019 - 10 - 26),
      changeEmail: () => null,
      changePassword: () => null,
      changePasswordConfirm: () => null,
      changeUsername: () => null,
      changeFirstName: () => null,
      changeLastName: () => null,
      changePhone: () => null,
      changeGender: () => null,
      changeBirthDate: () => null,
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<SignUpForm {...stubProps} />);
    const wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });
});
