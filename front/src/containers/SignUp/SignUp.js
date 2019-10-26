import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions';
import SignUpForm from '../../components/SignUp/SignUpForm';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      gender: undefined,
      birthdate: new Date(),
    };
  }

  clickSignUpHandler = () => {
    const { onSignUp } = this.props;
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    } = this.state;
    const signUpInfo = {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    };
    onSignUp(signUpInfo);
  };

  changeEmailHandler = event => this.setState({ email: event.target.value });

  changePasswordHandler = event =>
    this.setState({ password: event.target.value });

  changePasswordConfirmHandler = event =>
    this.setState({ passwordConfirm: event.target.value });

  changeUsernameHandler = event =>
    this.setState({ username: event.target.value });

  changeFirstNameHandler = event =>
    this.setState({ firstName: event.target.value });

  changeLastNameHandler = event =>
    this.setState({ lastName: event.target.value });

  changePhoneHandler = event => this.setState({ phone: event.target.value });

  changeGenderHandler = event => {
    if (event.target.value === 'male') {
      this.setState({ gender: true });
    } else {
      this.setState({ gender: false });
    }
  };

  changeBirthDateHandler = event =>
    this.setState({ birthdate: event.target.value });

  render() {
    const {
      email,
      password,
      passwordConfirm,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    } = this.state;
    return (
      <div className="SignUp">
        <SignUpForm
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          username={username}
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          gender={gender}
          birthdate={birthdate}
          changeEmail={this.changeEmailHandler}
          changePassword={this.changePasswordHandler}
          changePasswordConfirm={this.changePasswordConfirmHandler}
          changeUsername={this.changeUsernameHandler}
          changeFirstName={this.changeFirstNameHandler}
          changeLastName={this.changeLastNameHandler}
          changePhone={this.changePhoneHandler}
          changeGender={this.changeGenderHandler}
          changeBirthDate={this.changeBirthDateHandler}
        />
        <button
          type="submit"
          id="sign-up-button"
          onClick={this.clickSignUpHandler}
        >
          SignUp
        </button>
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
