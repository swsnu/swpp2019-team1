import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';

describe('<SignUp />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignUp />);
    const wrapper = component.find('.SignUp');
    expect(wrapper.length).toBe(1);
  });
});
