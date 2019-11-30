import React from 'react';
import { shallow } from 'enzyme';

import moment from 'moment';
import ScheduleTable from './ScheduleTable';

const testMatch = { timeBegin: moment(), timeEnd: moment() };

describe('<ScheduleTable />', () => {
  it('should render without errors', () => {
    const dummyStyle = null;
    const scheduleTable = (
      <ScheduleTable style={dummyStyle} schedule={[testMatch]} />
    );
    const component = shallow(scheduleTable);
    const wrapper = component.find('.ScheduleTable');
    expect(wrapper.length).toBe(1);
  });
});
