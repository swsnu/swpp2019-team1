import React from 'react';
import { shallow } from 'enzyme';
import MatchForm from './MatchForm';

describe('<MatchForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<MatchForm />);
    const wrapper = component.find('.MatchForm');
    expect(wrapper.length).toBe(1);
  });
});
