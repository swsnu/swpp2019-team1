import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = ({
  email,
  password,
  passwordConfirm,
  username,
  firstName,
  lastName,
  phone,
  gender,
  birthdate,
  changeEmail,
  changePassword,
  changePasswordConfirm,
  changeUsername,
  changeFirstName,
  changeLastName,
  changePhone,
  changeGender,
  changeBirthDate,
}) => (
  <div className="SignUpForm">
    <label htmlFor="email-input">
      Email
      <input
        id="email-input"
        type="email"
        value={email}
        onChange={changeEmail}
        required
      />
    </label>
    <label htmlFor="password-input">
      Password
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={changePassword}
        required
      />
    </label>
    <label htmlFor="password-confirm-input">
      Password Confirm
      <input
        id="password-confirm-input"
        type="password"
        value={passwordConfirm}
        onChange={changePasswordConfirm}
        required
      />
    </label>
    <label htmlFor="username-input">
      Username
      <input
        id="username-input"
        type="text"
        value={username}
        onChange={changeUsername}
        required
      />
    </label>
    <label htmlFor="first-name-input">
      First Name
      <input
        id="first-name-input"
        type="text"
        value={firstName}
        onChange={changeFirstName}
        required
      />
    </label>
    <label htmlFor="last-name-input">
      Last Name
      <input
        id="last-name-input"
        type="text"
        value={lastName}
        onChange={changeLastName}
        required
      />
    </label>
    <label htmlFor="phone-input">
      Phone
      <input
        id="phone-input"
        type="text"
        value={phone}
        onChange={changePhone}
        required
      />
    </label>
    <label htmlFor="gender-input">
      Gender
      <input
        type="radio"
        name="gender-radio-input"
        value="male"
        checked={!!gender}
        onChange={changeGender}
        required
      />
      Male
      <input
        type="radio"
        name="gender-radio-input"
        value="female"
        checked={!gender}
        onChange={changeGender}
      />
      Female
    </label>
    <label htmlFor="birthdate-input">
      Birthdate
      <input
        id="birthdate-input"
        type="date"
        value={birthdate}
        onChange={changeBirthDate}
        required
      />
    </label>
  </div>
);
SignUpForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  gender: PropTypes.bool,
  birthdate: PropTypes.objectOf(Date).isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  changePasswordConfirm: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changeFirstName: PropTypes.func.isRequired,
  changeLastName: PropTypes.func.isRequired,
  changePhone: PropTypes.func.isRequired,
  changeGender: PropTypes.func.isRequired,
  changeBirthDate: PropTypes.func.isRequired,
};
SignUpForm.defaultProps = {
  gender: undefined,
};
export default SignUpForm;
