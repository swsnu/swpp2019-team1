import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  PageHeader,
  Menu,
  Dropdown,
  Icon,
  Button,
  Typography,
  Row,
  Tabs,
  Descriptions,
} from 'antd';
import * as actionCreators from '../../../store/actions/index';
import Interests from '../../../components/User/Interests/Interests';
import ScheduleCalendar from '../../../components/User/Schedule/ScheduleCalendar';
import ScheduleTable from '../../../components/User/Schedule/ScheduleTable';

const { TabPane } = Tabs;
const { Item } = Descriptions;
const renderContent = user => (
  <Descriptions size="small" column={2}>
    <Item label="Email">
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </Item>
    <Item label="Gender">{user.gender ? 'Male' : 'Female'}</Item>
    <Item label="Name">{user.fullName}</Item>
    <Item label="Birthdate">{user.birthdate}</Item>
    <Item label="Phone">
      <a href={`skype:${user.email}?call`}>{user.phoneNumber}</a>
    </Item>
    <Item />
    <Item label="Message">{user.message}</Item>
  </Descriptions>
);

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        1st menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <Icon
          type="ellipsis"
          style={{
            fontSize: 20,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
};

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Profile',
  },
];

// eslint-disable-next-line react/prop-types
const Content = ({ children, extraContent }) => {
  return (
    <Row className="content" type="flex">
      <div className="main" style={{ flex: 1 }}>
        {children}
      </div>
      <div
        className="extra"
        style={{
          marginLeft: 80,
        }}
      >
        {extraContent}
      </div>
    </Row>
  );
};
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestArray: ['Movie/SF', 'Movie/Comics', 'Study/Physics'],
    };
  }

  componentDidMount() {
    const { onGetUser, match } = this.props;
    onGetUser(match.params.id);
  }

  onChangeInterest = (value, selectedOptions, i) => {
    const { interestArray } = this.state;
    interestArray[i] = selectedOptions.map(o => o.label).join('/');
    this.setState({
      interestArray,
    });
  };

  render() {
    const { history, selectedUser } = this.props;
    if (!selectedUser) return null;
    const { interestArray } = this.state;
    return (
      <div className="UserProfile">
        <PageHeader
          title={selectedUser.username}
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          subTitle="cooper@caltech.edu"
          extra={[
            <Button
              key="1"
              id="edit-profile-button"
              onClick={() => history.push('/profile/edit')}
            >
              Edit
            </Button>,
            <DropdownMenu key="more" />,
          ]}
          avatar={{
            src: 'https://i.imgur.com/fYdbabs.png',
          }}
          breadcrumb={{ routes }}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Schedule" key="1">
                <div
                  className="Schedule"
                  style={{
                    display: 'flex',
                  }}
                >
                  <ScheduleCalendar
                    style={{
                      width: 800,
                      border: '1px solid #d9d9d9',
                      borderRadius: 4,
                    }}
                  />
                  <ScheduleTable
                    style={{
                      width: 500,
                      border: '1px solid #d9d9d9',
                      borderRadius: 4,
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="Interests" key="2">
                <Typography.Paragraph />
                <Interests
                  interestArray={interestArray}
                  onChangeInterest={this.onChangeInterest}
                />
              </TabPane>
            </Tabs>
          }
        >
          <Content>
            <Typography.Paragraph />
            {renderContent(selectedUser)}
            <Typography.Paragraph />
          </Content>
        </PageHeader>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedUser: state.user.selectedUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUser: id => dispatch(actionCreators.getUser(id)),
  };
};
UserProfile.propTypes = {
  selectedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    gender: PropTypes.bool,
    birthdate: PropTypes.string.isRequired,
    message: PropTypes.string,
  }),
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  onGetUser: PropTypes.func.isRequired,
};
UserProfile.defaultProps = {
  selectedUser: null,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
