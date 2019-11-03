import React from 'react';
import { shallow } from 'enzyme';
import ProfileEdit from './ProfileEdit';

describe('<ProfileEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<ProfileEdit />);
    const wrapper = component.find('.ProfileEdit');
    expect(wrapper.length).toBe(1);
  });
});
