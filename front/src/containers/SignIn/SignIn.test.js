import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('<SignIn />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignIn />);
    const wrapper = component.find('.SignIn');
    expect(wrapper.length).toBe(1);
  });
});
