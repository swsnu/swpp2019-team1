import React from 'react';
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
import './SignUpForm.css';

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
const SignUpSchema = Yup.object().shape({
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
  clickSignUp,
}) => (
  <div className="SignUpForm">
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
      onSubmit={(values, actions) => {
        clickSignUp(values);
        actions.setSubmitting(false);
      }}
      validationSchema={SignUpSchema}
    >
      {({ setFieldValue }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Form {...formItemLayout}>
          <FormItem name="email" label="Email">
            <Input name="email" id="email" placeholder="Email" />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input.Password
              name="password"
              id="password"
              placeholder="Password"
            />
          </FormItem>
          <FormItem name="passwordConfirm" label="PasswordConfirm">
            <Input.Password
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm"
            />
          </FormItem>
          <FormItem name="username" label="Username">
            <Input name="username" id="username" placeholder="Username" />
          </FormItem>
          <FormItem name="firstName" label="First Name">
            <Input name="firstName" id="firstName" placeholder="First Name" />
          </FormItem>
          <FormItem name="lastName" label="Last Name">
            <Input name="lastName" id="lastName" placeholder="Last Name" />
          </FormItem>
          <FormItem name="phone" label="Phone">
            <Input name="phone" id="phone" placeholder="Phone" />
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
              onChange={event => {
                setFieldValue('gender', event.target.value);
              }}
            />
          </FormItem>
          <FormItem name="birthdate" label="Birthdate">
            <DatePicker
              name="birthdate"
              onChange={(date, dateString) => {
                setFieldValue('birthdate', dateString);
              }}
              placeholder="Birthdate"
            />
          </FormItem>
          <div className="button">
            <SubmitButton type="primary">Sign Up</SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
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
  birthdate: PropTypes.string.isRequired,
  clickSignUp: PropTypes.func.isRequired,
};
SignUpForm.defaultProps = {
  gender: undefined,
};
export default SignUpForm;
