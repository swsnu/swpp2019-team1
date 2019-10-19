import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
      gender: null,
      birthdate: null,
    };
  }

  onClickSignUp = (email, password, { signUp }) => {
    signUp(email, password);
  };

  handleInputEmailChange = event =>
    this.setState({ email: event.target.value });

  handleInputPasswordChange = event =>
    this.setState({ password: event.target.value });

  handleInputPasswordConfirmChange = event =>
    this.setState({ passwordConfirm: event.target.value });

  handleInputUsernameChange = event =>
    this.setState({ username: event.target.value });

  handleInputFirstNameChange = event =>
    this.setState({ firstName: event.target.value });

  handleInputLastNameChange = event =>
    this.setState({ lastName: event.target.value });

  handleInputPhoneChange = event =>
    this.setState({ phone: event.target.value });

  handleInputGenderChange = event =>
    this.setState({ gender: event.target.value });

  handleInputBirthdateChange = event =>
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
          inputEmailChange={event => this.handleInputEmailChange(event)}
          inputPasswordChange={event => this.handleInputPasswordChange(event)}
          inputPasswordConfirmChange={event =>
            this.handleInputPasswordConfirmChange(event)}
          inputUsernameChange={event => this.handleInputUsernameChange(event)}
          inputFirstNameChange={event => this.handleInputFirstNameChange(event)}
          inputLastNameChange={event => this.handleInputLastNameChange(event)}
          inputPhoneChange={event => this.handleInputPhoneChange(event)}
          inputGenderChange={event => this.handleInputGenderChange(event)}
          inputBirthDateChange={event => this.handleInputBirthDateChange(event)}
        />
        <button type="button" id="login-button" onClick={this.onClickSignUp}>
          Login
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password) =>
      dispatch(actionCreators.SignUp(email, password)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignUp));
