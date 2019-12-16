import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import momentPropTypes from 'react-moment-proptypes';
import ScheduleTable from './ScheduleTable';

import './ScheduleCalendar.css';

// eslint-disable-next-line react/prop-types
class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: moment() };
    this.searchInput = React.createRef();
  }

  isInPeriod = (value, timeBegin, timeEnd) => {
    return (
      timeBegin.format('YYYYMMDD') <= value.format('YYYYMMDD') &&
      timeEnd.format('YYYYMMDD') >= value.format('YYYYMMDD')
    );
  };

  selectSchedule = value => {
    const { schedule } = this.props;
    const selectedSchedule = schedule.filter(match =>
      this.isInPeriod(value, match.timeBegin, match.timeEnd),
    );
    return selectedSchedule;
  };

  getListData = value => {
    const listData = [];

    const selectedSchedule = this.selectSchedule(value);
    selectedSchedule.forEach(match =>
      listData.push({ type: 'success', content: match.title, id: match.id }),
    );

    return listData;
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { style } = this.props;
    const { selectedValue } = this.state;
    return (
      <div className="ScheduleCalendar" style={style}>
        <Calendar
          dateCellRender={this.dateCellRender}
          value={selectedValue}
          onChange={value => this.setState({ selectedValue: value })}
        />
        <ScheduleTable
          style={{
            width: 1000,
            border: '1px solid #d9d9d9',
            borderRadius: 4,
          }}
          schedule={this.selectSchedule(selectedValue)}
        />
      </div>
    );
  }
}
ScheduleCalendar.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      timeBegin: momentPropTypes.momentObj,
      timeEnd: momentPropTypes.momentObj,
    }),
  ).isRequired,
};

ScheduleCalendar.defaultProps = {};

export default ScheduleCalendar;
