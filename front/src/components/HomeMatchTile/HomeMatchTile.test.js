import React from 'react';
import { shallow } from 'enzyme';
import HomeMatchTile from './HomeMatchTile';

describe('<HomeMatchTile />', () => {
  it('should render without errors', () => {
    const component = shallow(<HomeMatchTile />);
    const wrapper = component.find('.HomeMatchTile');
    expect(wrapper.length).toBe(1);
  });
});
