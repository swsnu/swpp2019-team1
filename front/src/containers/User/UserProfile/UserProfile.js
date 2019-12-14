import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import ReactRouterPropTypes from 'react-router-prop-types';

import { PageHeader, Button, Typography, Row, Tabs, Descriptions } from 'antd';

import * as actionCreators from '../../../store/actions/index';
import Interests from '../../../components/User/Interests/Interests';
import ScheduleCalendar from '../../../components/User/Schedule/ScheduleCalendar';

import './UserProfile.css';

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

const routes = [
  {
    path: 'index',
    // breadcrumbName: 'Profile',
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
      valueList: [[], [], []],
      isEdit: false,
    };
  }

  componentDidMount() {
    const { onGetUser, match } = this.props;
    window.scrollTo(0, 0);
    onGetUser(match.params.id)
      .then(() => {
        const { selectedUser } = this.props;
        this.setState({ valueList: selectedUser.interests });
      })
      .catch(() => {});
  }

  onChangeInterest = index => value => {
    const { valueList } = this.state;
    valueList[index] = value;
    this.setState({
      valueList,
    });
  };

  onClickEditInterest = () => {
    const { onEditInterest, currentUser } = this.props;
    const { valueList, isEdit } = this.state;
    if (isEdit) {
      onEditInterest(currentUser.id, valueList);
      this.setState({ isEdit: false });
    } else this.setState({ isEdit: true });
  };

  render() {
    const { history, selectedUser, currentUser } = this.props;
    if (!selectedUser) return null;
    const { valueList, isEdit } = this.state;
    const isEditable = !!currentUser && selectedUser.id === currentUser.id;
    return (
      <div className="UserProfile">
        <PageHeader
          title={selectedUser.username}
          // style={{
          //   border: '1px solid rgb(235, 237, 240)',
          // }}
          extra={[
            isEditable && (
              <Button
                key="1"
                id="edit-profile-button"
                onClick={() => history.push(`/profile/${currentUser.id}/edit`)}
              >
                Edit
              </Button>
            ),
          ]}
          avatar={{
            src: selectedUser.profilePicture,
          }}
          breadcrumb={{ routes }}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Schedule" key="1">
                <div className="Schedule">
                  <ScheduleCalendar
                    style={{
                      width: 1000,
                      border: '1px solid #7c5a5a',
                      borderRadius: 6,
                      display: 'flex',
                    }}
                    schedule={selectedUser.schedule}
                  />
                </div>
              </TabPane>
              <TabPane tab="Interests" key="2">
                <Typography.Paragraph />
                <Interests
                  isEdit={isEdit}
                  isEditable={isEditable}
                  buttonText={isEdit ? 'Confirm' : 'Edit'}
                  onClickButton={this.onClickEditInterest}
                  onChangeInterest={this.onChangeInterest}
                  valueList={valueList}
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
    currentUser: state.user.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUser: id => dispatch(actionCreators.getUser(id)),
    onEditInterest: (id, valueList) =>
      dispatch(actionCreators.editInterest(id, valueList)),
  };
};
UserProfile.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    gender: PropTypes.bool,
    birthdate: PropTypes.string.isRequired,
    message: PropTypes.string,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        timeBegin: momentPropTypes.momentObj,
        timeEnd: momentPropTypes.momentObj,
      }),
    ),
    interests: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
      .isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onEditInterest: PropTypes.func.isRequired,
};
UserProfile.defaultProps = {
  selectedUser: null,
  currentUser: null,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
