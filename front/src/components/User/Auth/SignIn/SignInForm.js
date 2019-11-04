import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, FormItem, SubmitButton } from 'formik-antd';
import { Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './SignInForm.css';

const ButtonGroup = Button.Group;

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
        <Form {...formItemLayout}>
          <div className="SignInFormItem">
            <FormItem name="email" label="Email">
              <Input
                name="email"
                id="email"
                placeholder="Email"
                onChange={onEmailChange}
              />
            </FormItem>
            <FormItem name="password" label="Password">
              <Input.Password
                onChange={onPasswordChange}
                name="password"
                id="password"
                placeholder="Password"
              />
            </FormItem>
          </div>
          <div className="button">
            <ButtonGroup>
              <SubmitButton className="SignInButton" type="primary">
                Sign In
              </SubmitButton>
              <Button className="SignUpButton" onClick={clickSignUp}>
                Sign Up
              </Button>
            </ButtonGroup>
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
