import React from 'react';
import { shallow } from 'enzyme';
import MatchEdit from './MatchEdit';

describe('<MatchEdit />', () => {
  it('should render without errors', () => {
    const component = shallow(<MatchEdit />);
    const wrapper = component.find('.MatchEdit');
    expect(wrapper.length).toBe(1);
  });
});
