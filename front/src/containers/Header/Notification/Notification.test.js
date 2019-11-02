import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notification';

describe('<Notification />', () => {
  it('should render without errors', () => {
    const component = shallow(<Notification />);
    const wrapper = component.find('.Notification');
    expect(wrapper.length).toBe(1);
  });
});
