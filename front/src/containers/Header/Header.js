import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'antd';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickSignInHandler = async () => {
    history.push('/signin');
  };

  clickSignOutHandler = async () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  clickHomeHandler = async () => {
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

    return (
      <div className="Header">
        <PageHeader
          style={{ border: '1px solid rgb(235, 237, 240)' }}
          onBack={() => null}
          title="Matchmaker"
          extra={buttons[signedIn]}
        />
      </div>
    );
  }
}

Header.propTypes = {
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
