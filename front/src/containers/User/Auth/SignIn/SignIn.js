import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../../store/actions/user';
import SignInForm from '../../../../components/User/Auth/SignIn/SignInForm';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  clickSignInHandler = async values => {
    const { onSignIn } = this.props;
    await this.setState({ ...values });
    const signInInfo = {
      email: values.email,
      password: values.password,
    };
    onSignIn(signInInfo);
  };

  clickSignUpHandler = () => {
    const { history } = this.props;
    history.push('/signup');
  };

  handleInputEmailChange = e => {
    this.setState({
      email: e.target.value,
    });
  };

  handleInputPasswordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="SignIn">
        <SignInForm
          email={email}
          password={password}
          onEmailChange={this.handleInputEmailChange}
          onPasswordChange={this.handleInputPasswordChange}
          clickSignIn={this.clickSignInHandler}
          clickSignUp={this.clickSignUpHandler}
        />
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: signInInfo => dispatch(actionCreators.signIn(signInInfo)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
