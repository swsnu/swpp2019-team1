import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('<Search />', () => {
  it('should render without errors', () => {
    const component = shallow(<Search />);
    const wrapper = component.find('.Search');
    expect(wrapper.length).toBe(1);
  });
});
