import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, FormItem, SubmitButton } from 'formik-antd';
import { Icon, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './SignInForm.css';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
});
const SignInForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  clickSignIn,
  clickSignUp,
}) => (
  <div className="SignInForm">
    <Formik
      initialValues={{
        email,
        password,
      }}
      onSubmit={(values, actions) => {
        clickSignIn(values);
        actions.setSubmitting(false);
      }}
      validationSchema={SignInSchema}
    >
      {() => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Form>
          <div className="SignInFormItem">
            <FormItem name="email">
              <Input
                name="email"
                id="email"
                placeholder="Email"
                onChange={onEmailChange}
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            </FormItem>
            <FormItem name="password">
              <Input.Password
                onChange={onPasswordChange}
                name="password"
                id="password"
                placeholder="Password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            </FormItem>
          </div>
          <div className="button">
            <SubmitButton className="SignInButton" type="primary">
              Sign In
            </SubmitButton>
            <div className="SignUpLink">
              Or
              <Button
                className="SignUpButton"
                type="link"
                onClick={clickSignUp}
              >
                sign up now!
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

SignInForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  clickSignIn: PropTypes.func.isRequired,
  clickSignUp: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {};

export default SignInForm;
