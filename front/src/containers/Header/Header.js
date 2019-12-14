import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Button, Layout, Menu, Dropdown, Avatar } from 'antd';
import * as actionCreators from '../../store/actions/user';
import logo from '../../logo';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onRestoreUser } = this.props;
    onRestoreUser();
  }

  clickSignUpHandler = async () => {
    const { history } = this.props;
    history.push('/signup');
  };

  clickSignInHandler = async () => {
    const { history } = this.props;
    history.push('/signin');
  };

  clickSignOutHandler = async () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  clickProfileHandler = async () => {
    const { history, currentUser } = this.props;
    history.push(`/profile/${currentUser.id}`); // TODO
  };

  createHeaderButtons = currentUser => {
    const menu = (
      <Menu onClick={() => null}>
        <Menu.Item key="1" onClick={this.clickProfileHandler}>
          <Icon type="user" />
          My Page
        </Menu.Item>
        <Menu.Item key="2" onClick={this.clickSignOutHandler}>
          <Icon type="logout" />
          Sign Out
        </Menu.Item>
      </Menu>
    );
    if (currentUser) {
      return [
        <Dropdown key="1" overlay={menu} trigger={['click']}>
          <Button type="link" ghost>
            <Avatar
              shape="square"
              size="large"
              src={currentUser.profilePicture}
            />
            <Icon type="down" />
          </Button>
        </Dropdown>,
      ];
    }
    return [
      <Button key="1" onClick={this.clickSignInHandler}>
        Sign In
      </Button>,
      <Button
        key="2"
        type="primary"
        style={{
          marginLeft: 3,
        }}
        onClick={this.clickSignUpHandler}
      >
        Sign Up
      </Button>,
    ];
  };

  render() {
    const { currentUser } = this.props;

    const buttons = this.createHeaderButtons(currentUser);

    return (
      <div className="Header">
        <Layout className="Layout">
          <Layout.Header>
            <div className="logo">
              <Link to="/home" className="LogoLink">
                {logo()}
              </Link>
            </div>
            <Link
              to="/home"
              style={{
                marginLeft: 5,
                color: 'white',
                fontSize: 30,
              }}
              className="TitleLink"
            >
              MatchMaker
            </Link>
            <div className="Buttons">{buttons}</div>
          </Layout.Header>
        </Layout>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    profilePicture: PropTypes.string,
  }),
  onSignOut: PropTypes.func.isRequired,
  onRestoreUser: PropTypes.func.isRequired,
};
Header.defaultProps = {
  currentUser: null,
};
const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
    onRestoreUser: () => dispatch(actionCreators.restoreUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
