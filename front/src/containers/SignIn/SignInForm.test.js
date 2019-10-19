import React from 'react';
import { shallow } from 'enzyme';
import SignInForm from './SignInForm';

describe('<SignInForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignInForm />);
    const wrapper = component.find('.SignInForm');
    expect(wrapper.length).toBe(1);
  });
});
