import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    title: 'Watch Star Trek film',
    time: '1:20 PM',
    participants: 4,
  },
  {
    key: '2',
    title: 'Comic con',
    time: '5:00 PM',
    participants: 5,
  },
];

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
const ScheduleTable = ({ style }) => (
  <div className="ScheduleTable" style={style}>
    <Table dataSource={dataSource} columns={columns} />
  </div>
);
ScheduleTable.propTypes = {};

ScheduleTable.defaultProps = {};

export default ScheduleTable;
