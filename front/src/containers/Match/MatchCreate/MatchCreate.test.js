import React from 'react';
import { shallow } from 'enzyme';
import MatchCreate from './MatchCreate';

describe('<MatchCreate />', () => {
  it('should render without errors', () => {
    const component = shallow(<MatchCreate />);
    const wrapper = component.find('.MatchCreate');
    expect(wrapper.length).toBe(1);
  });
});
