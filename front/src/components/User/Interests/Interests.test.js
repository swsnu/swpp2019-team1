import React from 'react';
import { Button } from 'antd';

import { mount } from 'enzyme';
import Interests from './Interests';

describe('<Interests />', () => {
  let interests;
  const stubOnClickButton = jest.fn(() => {});
  beforeEach(() => {
    interests = (
      <Interests
        isEdit
        isEditable
        buttonText="test"
        onClickButton={stubOnClickButton}
        onChangeInterest={() => {}}
        valueList={[]}
      />
    );
  });
  it('should render without errors', () => {
    const component = mount(interests);
    const wrapper = component.find('.Interests');
    expect(wrapper.length).toBe(1);
  });

  it('should call onClickButton on click button', () => {
    const component = mount(interests);
    const wrapper = component.find(Button);
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(stubOnClickButton).toHaveBeenCalledTimes(1);
  });
});
