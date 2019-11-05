import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Icon, Button, PageHeader } from 'antd';
import * as actionCreators from '../../store/actions/user';
import logo from '../../logo';

export function getHeaderName(pathname) {
  if (pathname === '/home') {
    return 'Matchmaker';
  }
  if (pathname === '/signup') {
    return 'Sign Up';
  }
  if (pathname === '/signin') {
    return 'Sign In';
  }
  if (pathname === '/search') {
    return 'Search';
  }
  if (pathname === '/match/create') {
    return 'Create new Match';
  }
  if (pathname === '/match/detail') {
    return 'Match Detail';
  }
  return '';
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { isSignedIn, location, history } = this.props;
    const buttons = [
      [
        <Button key="2" onClick={this.clickSignInHandler}>
          Sign In
        </Button>,
        <Button key="1" type="primary" onClick={this.clickSignUpHandler}>
          Sign Up
        </Button>,
      ],
      [
        <Button key="2" onClick={this.clickSignOutHandler}>
          Sign Out
        </Button>,
      ],
    ];
    return (
      <div className="Header">
        <PageHeader
          style={{ border: '1px solid rgb(235, 237, 240)' }}
          title={getHeaderName(location.pathname)}
          extra={buttons[isSignedIn]}
          onBack={() => history.push('/home')}
          backIcon={<Icon className="HomeIcon" component={logo} />}
        />
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
  isSignedIn: PropTypes.number.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.user.isSignedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
