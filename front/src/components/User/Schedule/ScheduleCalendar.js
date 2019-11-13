import React from 'react';
import { Calendar, Badge } from 'antd';
import './ScheduleCalendar.css';

export function getListData(value) {
  let listData;
  // if (value.month() !== 10) return [];
  switch (value.date()) {
    case 21:
      listData = [
        { type: 'warning', content: 'Watch Star Trek film' },
        { type: 'success', content: 'Comic Con' },
        { type: 'error', content: 'Train museum' },
      ];
      break;
    default:
  }
  return listData || [];
}

export function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

export function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
  return null;
}

export function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

// eslint-disable-next-line react/prop-types
const ScheduleCalendar = ({ style }) => (
  <div className="ScheduleCalendar" style={style}>
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  </div>
);

ScheduleCalendar.propTypes = {};

ScheduleCalendar.defaultProps = {};

export default ScheduleCalendar;
