import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignUpForm />);
    const wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });
});
