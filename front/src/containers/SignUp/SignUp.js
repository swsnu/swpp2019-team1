import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions';
import SignUpForm from '../../components/SignUp/SignUpForm';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickSignUpHandler = values => {
    const { onSignUp } = this.props;
    const signUpInfo = {
      email: values.email,
      password: values.password,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      gender: values.gender,
      birthdate: values.birthdate,
    };

    onSignUp(signUpInfo);
  };

  render() {
    return (
      <div className="SignUp">
        <SignUpForm clickSignUp={this.clickSignUpHandler} />
      </div>
    );
  }
}
SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    onSignUp: signUpInfo => dispatch(actionCreators.createUser(signUpInfo)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignUp));
