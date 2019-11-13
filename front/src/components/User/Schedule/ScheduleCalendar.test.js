import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ScheduleCalendar, {
  getMonthData,
  monthCellRender,
  getListData,
} from './ScheduleCalendar';

const listData = [
  { type: 'warning', content: 'Watch Star Trek film' },
  { type: 'success', content: 'Comic Con' },
  { type: 'error', content: 'Train museum' },
];

describe('<ScheduleCalendar />', () => {
  it('should render without errors', () => {
    const dummyStyle = null;
    const scheduleCalendar = <ScheduleCalendar style={dummyStyle} />;
    const component = shallow(scheduleCalendar);
    const wrapper = component.find('.ScheduleCalendar');
    expect(wrapper.length).toBe(1);
  });

  it('test functions', () => {
    expect(getMonthData(moment('20120920'))).toBe(1394);
    expect(monthCellRender(moment('20120620'))).toBe(null);
    expect(monthCellRender(moment('20120920'))).toMatchObject(
      <div className="notes-month">
        <section>{1394}</section>
        <span>Backlog number</span>
      </div>,
    );
    expect(getListData(moment('20120920'))).toEqual(expect.arrayContaining([]));
    expect(getListData(moment('20120921'))).toEqual(
      expect.arrayContaining(listData),
    );
  });
});
