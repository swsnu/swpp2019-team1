import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'antd';
import * as actionCreators from '../../store/actions/user';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickSignInHandler = async () => {
    const { history } = this.props;
    history.push('/signin');
  };

  clickSignOutHandler = async () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  clickHomeHandler = async () => {
    const { history } = this.props;
    history.push('/home');
  };

  render() {
    const { signedIn } = this.props;
    const buttons = [
      [
        <Button key="2" onClick={this.clickSignInHandler}>
          Sign In
        </Button>,
        <Button key="1" onClick={this.clickHomeHandler}>
          Matchmaker
        </Button>,
      ],
      [
        <Button key="2" onClick={this.clickSignOutHandler}>
          Sign Out
        </Button>,
        <Button key="1" onClick={this.clickHomeHandler}>
          Matchmaker
        </Button>,
      ],
    ];
    const { history, location } = this.props;
    if (location.pathname === '/home') {
      return (
        <div className="Header">
          <PageHeader
            style={{ border: '1px solid rgb(235, 237, 240)' }}
            title="Matchmaker"
            extra={buttons[signedIn]}
          />
        </div>
      );
    }
    return (
      <div className="Header">
        <PageHeader
          style={{ border: '1px solid rgb(235, 237, 240)' }}
          onBack={() => history.goBack()}
          title="Matchmaker"
          extra={buttons[signedIn]}
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
  signedIn: PropTypes.number.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    signedIn: state.user.signedIn,
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
