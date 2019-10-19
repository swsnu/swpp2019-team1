import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('should render without errors', () => {
    const component = shallow(<HomePage />);
    const wrapper = component.find('.HomePage');
    expect(wrapper.length).toBe(1);
  });
});
