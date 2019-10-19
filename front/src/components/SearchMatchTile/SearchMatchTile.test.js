import React from 'react';
import { shallow } from 'enzyme';
import SearchMatchTile from './SearchMatchTile';

describe('<SearchMatchTile />', () => {
  it('should render without errors', () => {
    const component = shallow(<SearchMatchTile />);
    const wrapper = component.find('.SearchMatchTile');
    expect(wrapper.length).toBe(1);
  });
});
