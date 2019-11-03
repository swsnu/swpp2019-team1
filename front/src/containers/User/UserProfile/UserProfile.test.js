import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

describe('<UserProfile />', () => {
  it('should render without errors', () => {
    const component = shallow(<UserProfile />);
    const wrapper = component.find('.UserProfile');
    expect(wrapper.length).toBe(1);
  });
});
