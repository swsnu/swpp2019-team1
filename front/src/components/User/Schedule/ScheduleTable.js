import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import sf from 'sf';

function formatScheduleTable(schedule) {
  return schedule.map(match => ({
    key: match.id,
    title: (
      <Link
        to={sf('/match/{0}', match.id)}
        className={sf('Match({0})DetailLink', match.id)}
      >
        {match.title}
      </Link>
    ),
    time: match.timeBegin.format('h:mm a'), // TODO: fix time
    participants: match.numParticipants,
  }));
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
    align: 'center',
  },
];
// eslint-disable-next-line react/prop-types
const ScheduleTable = ({ style, schedule }) => (
  <div className="ScheduleTable" style={style}>
    <Table dataSource={formatScheduleTable(schedule)} columns={columns} />
  </div>
);
ScheduleTable.propTypes = {};

ScheduleTable.defaultProps = {};

export default ScheduleTable;
