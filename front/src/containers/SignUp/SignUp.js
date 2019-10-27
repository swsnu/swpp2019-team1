import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  FormItem,
  SubmitButton,
} from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actionCreators from '../../store/actions';
import './SignUp.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const phoneRegExp = /^\d{3}-\d{4}-\d{4}$/;
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Passwords must match'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  gender: Yup.bool().required('Required'),
  birthdate: Yup.string().required('Required'),
});
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
      birthdate: '',
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
    this.setState({ gender: event.target.value });
  };

  changeBirthDateHandler = value => this.setState({ birthdate: value });

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
        <Formik
          initialValues={{
            email,
            password,
            passwordConfirm,
            username,
            firstName,
            lastName,
            phone,
            gender,
            birthdate,
          }}
          onSubmit={this.clickSignUpHandler}
          validationSchema={SignupSchema}
        >
          {({ setFieldValue }) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Form {...formItemLayout}>
              <FormItem name="email" label="Email">
                <Input
                  name="email"
                  id="email"
                  onChange={this.changeEmailHandler}
                  placeholder="Email"
                />
              </FormItem>
              <FormItem name="password" label="Password">
                <Input.Password
                  name="password"
                  id="password"
                  onChange={this.changePasswordHandler}
                  placeholder="Password"
                />
              </FormItem>
              <FormItem name="passwordConfirm" label="PasswordConfirm">
                <Input.Password
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={this.changePasswordConfirmHandler}
                  placeholder="Confirm"
                />
              </FormItem>
              <FormItem name="username" label="Username">
                <Input
                  name="username"
                  id="username"
                  onChange={this.changeUsernameHandler}
                  placeholder="Username"
                />
              </FormItem>
              <FormItem name="firstName" label="First Name">
                <Input
                  name="firstName"
                  id="firstName"
                  onChange={this.changeFirstNameHandler}
                  placeholder="First Name"
                />
              </FormItem>
              <FormItem name="lastName" label="Last Name">
                <Input
                  name="lastName"
                  id="lastName"
                  onChange={this.changeLastNameHandler}
                  placeholder="Last Name"
                />
              </FormItem>
              <FormItem name="phone" label="Phone">
                <Input
                  name="phone"
                  id="phone"
                  onChange={this.changePhoneHandler}
                  placeholder="Phone"
                />
              </FormItem>
              <FormItem name="gender" label="Gender">
                <Radio.Group
                  name="gender"
                  options={[
                    {
                      label: 'Male',
                      value: true,
                    },
                    {
                      label: 'Female',
                      value: false,
                    },
                  ]}
                  id="gender"
                  onChange={async event => {
                    await setFieldValue('gender', event.target.value);
                    this.changeGenderHandler(event);
                  }}
                />
              </FormItem>
              <FormItem name="birthdate" label="Birthdate">
                <DatePicker
                  name="birthdate"
                  onChange={(date, dateString) => {
                    this.changeBirthDateHandler(dateString);
                    setFieldValue('birthdate', dateString);
                  }}
                  placeholder="Birthdate"
                />
              </FormItem>
              <div className="button">
                <SubmitButton type="primary" style={{ margin: 'auto' }}>
                  Sign Up
                </SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
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
