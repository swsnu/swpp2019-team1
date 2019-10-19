import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { act } from '@testing-library/react';
import { Form, DatePicker } from 'formik-antd';
import SignUp from './SignUp';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';

const stubUser = {};
const stubMatch = {};
const mockStore = getMockStore(stubUser, stubMatch);
const stubSignUpInput = {
  email: 'swpp@snu.ac.kr',
  password: 'test_password',
  passwordConfirm: 'test_password',
  username: 'test_username',
  firstName: 'test_firstName',
  lastName: 'test_lastName',
  phone: '012-3456-7890',
  gender: true,
  birthdate: '2000-12-12',
};
describe('<SignUp />', () => {
  let signUp;
  beforeEach(() => {
    signUp = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    const component = mount(signUp);
    let wrapper = component.find('.SignUp');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });

  it(`should call createUser() properly on submit`, async () => {
    const spySignUp = jest
      .spyOn(actionCreators, 'createUser')
      .mockImplementation(() => {
        return () => {};
      });
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    } = stubSignUpInput;
    const stubSignUpInfo = {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    };
    const component = mount(signUp);
    let wrapper = component.find('Input');
    await act(async () => {
      wrapper.at(0).prop('onChange')({
        target: { name: 'email', value: stubSignUpInput.email },
      });
      wrapper.at(1).prop('onChange')({
        target: { name: 'password', value: stubSignUpInput.password },
      });
      wrapper.at(2).prop('onChange')({
        target: {
          name: 'passwordConfirm',
          value: stubSignUpInput.passwordConfirm,
        },
      });
      wrapper.at(3).prop('onChange')({
        target: { name: 'username', value: stubSignUpInput.username },
      });
      wrapper.at(4).prop('onChange')({
        target: { name: 'firstName', value: stubSignUpInput.firstName },
      });
      wrapper.at(5).prop('onChange')({
        target: { name: 'lastName', value: stubSignUpInput.lastName },
      });
      wrapper.at(6).prop('onChange')({
        target: { name: 'phone', value: stubSignUpInput.phone },
      });
      wrapper = component.find('Checkbox');
      wrapper.at(0).prop('onChange')({
        target: { name: 'gender', value: stubSignUpInput.gender },
      });
      wrapper = component.find(DatePicker);
      wrapper.prop('onChange')(new Date(), stubSignUpInput.birthdate);
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      // console.log(wrapper.debug());
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    expect(spySignUp).toHaveBeenCalledWith(stubSignUpInfo);
  });
  /*
  xit(`should call createUser() properly on submit (react-testing-library)`, async () => {
    const spySignUp = jest
      .spyOn(actionCreators, 'createUser')
      .mockImplementation(() => {
        return () => {};
      });
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    } = stubSignUpInput;
    const stubSignUpInfo = {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      gender,
      birthdate,
    };
    const signUpRendering = render(signUp);
    await act(async () => {
      const emailInput = signUpRendering.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: stubSignUpInfo.email } });
      const passwordInput = signUpRendering.getByLabelText('Password');
      fireEvent.change(passwordInput, {
        target: { value: stubSignUpInput.password },
      });
      const passwordConfirmInput = signUpRendering.getByLabelText('Confirm');
      fireEvent.change(passwordConfirmInput, {
        target: { value: stubSignUpInput.passwordConfirm },
      });
      const usernameInput = signUpRendering.getByLabelText('Username');
      fireEvent.change(usernameInput, {
        target: { value: stubSignUpInput.username },
      });
      const firstNameInput = signUpRendering.getByLabelText('First Name');
      fireEvent.change(firstNameInput, {
        target: { value: stubSignUpInput.firstName },
      });
      const lastNameInput = signUpRendering.getByLabelText('Last Name');
      fireEvent.change(lastNameInput, {
        target: { value: stubSignUpInput.lastName },
      });
      const phoneInput = signUpRendering.getByLabelText('Phone');
      fireEvent.change(phoneInput, {
        target: { value: stubSignUpInput.phone },
      });

      const genderInput = signUpRendering.getByLabelText('Male');
      fireEvent.click(genderInput, {
        target: { value: stubSignUpInput.gender },
      });

      const birthdateInput = signUpRendering.getByLabelText('Birthdate');
      fireEvent.change(
        birthdateInput,
        {
          target: {
            name: birthdate,
            value: stubSignUpInput.birthdate,
          },
        },
        stubSignUpInput.birthdate,
      ); // TODO: not working
      fireEvent.click(birthdateInput);

      // await new Promise(resolve => setTimeout(resolve, 1000));
      const signUpButton = signUpRendering.getByLabelText('Sign Up');
      fireEvent.submit(signUpButton);
      // await new Promise(resolve => setTimeout(resolve, 1000));
    });
    await wait(() => expect(spySignUp).toHaveBeenCalledWith(stubSignUpInput));
  });
  */
});
