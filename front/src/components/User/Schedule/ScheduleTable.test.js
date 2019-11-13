import React from 'react';
import { mount } from 'enzyme';
import ScheduleTable from './ScheduleTable';

describe('<ScheduleTable />', () => {
  it('should render without errors', () => {
    const dummyStyle = null;
    const scheduleTable = <ScheduleTable style={dummyStyle} />;
    const component = mount(scheduleTable);
    const wrapper = component.find('.ScheduleTable');
    expect(wrapper.length).toBe(1);
  });
});
