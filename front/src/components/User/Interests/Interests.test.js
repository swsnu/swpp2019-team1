import React from 'react';
import { Cascader } from 'antd';

import { mount } from 'enzyme';
import Interests from './Interests';

describe('<Interests />', () => {
  let dummyState;
  let interests;
  beforeEach(() => {
    dummyState = {
      interestArray: ['Movie/SF', 'Movie/Comics', 'Study/Physics'],
    };
    interests = (
      <Interests
        interestArray={dummyState.interestArray}
        onChangeInterest={() => null}
      />
    );
  });
  it('should render without errors', () => {
    const component = mount(interests);
    const wrapper = component.find('.Interests');
    expect(wrapper.length).toBe(1);
  });
  it('should call onChangeInterest when changing interest', () => {
    const component = mount(interests);
    const wrapper = component.find(Cascader);
    expect(wrapper.length).toBe(3);

    wrapper.at(0).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);
    wrapper.at(1).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);
    wrapper.at(2).prop('onChange')([0, 0], ['TEST_OPT_1', 'TEST_OPT_2']);
  });
});
