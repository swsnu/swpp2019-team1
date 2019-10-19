import React from 'react';

const LoginForm = ({
  email,
  password,
  passwordConfirm,
  username,
  firstName,
  lastName,
  phone,
  gender,
  birthdate,
  inputEmailChange,
  inputPasswordChange,
  inputPasswordConfirmChange,
  inputUsernameChange,
  inputFirstNameChange,
  inputLastNameChange,
  inputPhoneChange,
  inputGenderChange,
  inputBirthdateChange,
}) => (
  <div className="LoginForm">
    <label htmlFor="email-input">
      Email
      <input
        id="email-input"
        type="text"
        value={email}
        onChange={inputEmailChange}
      />
    </label>
    <label htmlFor="password-input">
      Password
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={inputPasswordChange}
      />
    </label>
    <label htmlFor="password-confirm-input">
      Password Confirm
      <input
        id="password-confirm-input"
        type="password"
        value={passwordConfirm}
        onChange={inputPasswordConfirmChange}
      />
    </label>
    <label htmlFor="username-input">
      Username
      <input
        id="username-input"
        type="text"
        value={username}
        onChange={inputUsernameChange}
      />
    </label>
    <label htmlFor="first-name-input">
      First Name
      <input
        id="first-name-input"
        type="text"
        value={firstName}
        onChange={inputFirstNameChange}
      />
    </label>
    <label htmlFor="last-name-input">
      Last Name
      <input
        id="last-name-input"
        type="text"
        value={lastName}
        onChange={inputLastNameChange}
      />
    </label>
    <label htmlFor="phone-input">
      Phone
      <input
        id="phone-input"
        type="text"
        value={phone}
        onChange={inputPhoneChange}
      />
    </label>
    <label htmlFor="gender-input">
      Gender
      <input type="radio" name="check-gender-input" value="true" />
      Male
      <input type="radio" name="check-gender-input" value="false" />
      Female
    </label>
    <label htmlFor="birthdate-input">
      Birthdate
      <input
        id="birthdate-input"
        type="date"
        value={birthdate}
        onChange={inputBirthdateChange}
      />
    </label>
  </div>
);
export default LoginForm;
