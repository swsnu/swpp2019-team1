import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { act } from '@testing-library/react';
import { Form, DatePicker } from 'formik-antd';
import moment from 'moment';

import UserProfileEdit from './UserProfileEdit';
import getMockStore from '../../../../test-utils/getMockStore';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/user';

const stubUser = {
  currentUser: {
    id: 1,
    email: 'TEST_EMAIL@test.com',
    username: 'TEST_UN',
    firstName: 'TEST_FN',
    lastName: 'TEST_LN',
    phoneNumber: '010-1234-5678',
    gender: true,
    birthdate: moment().format(),
    message: 'TEST_MESSAGE',
    schedule: [],
    interests: [],
  },
};
const stubNoUser = {
  currentUser: null,
};
const dummyMatch = {};
const mockStore = getMockStore(stubUser, dummyMatch);
const mockStoreNoUser = getMockStore(stubNoUser, dummyMatch);

const testUserProfileEditInput = {
  password: 'test_password',
  passwordConfirm: 'test_password',
  username: 'test_username',
  firstName: 'test_firstName',
  lastName: 'test_lastName',
  phoneNumber: '012-3456-7890',
  gender: true,
  birthdate: '2000-12-12',
};
describe('<UserProfileEdit />', () => {
  let userProfileEdit;
  let userProfileEditNoUser;
  beforeEach(() => {
    userProfileEdit = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={UserProfileEdit} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    userProfileEditNoUser = (
      <Provider store={mockStoreNoUser}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={UserProfileEdit} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    const component = mount(userProfileEdit);
    let wrapper = component.find('.UserProfileEdit');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.SignUpForm');
    expect(wrapper.length).toBe(1);
  });

  it(`should call createUser() properly on submit`, async () => {
    const spyUserProfileEdit = jest
      .spyOn(actionCreators, 'editUser')
      .mockImplementation(() => {
        return () => {};
      });
    const {
      password,
      username,
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthdate,
    } = testUserProfileEditInput;
    const testUserProfileEditInfo = {
      password,
      username,
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthdate,
    };
    const component = mount(userProfileEdit);
    const userProfileEditInstance = component
      .find(UserProfileEdit.WrappedComponent)
      .instance();
    const initialState = userProfileEditInstance.state;
    let wrapper = component.find(Form);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
    });
    // should not submit with wrong input
    expect(spyUserProfileEdit).toHaveBeenCalledTimes(0);
    expect(userProfileEditInstance.state).toEqual(initialState);

    wrapper = component.find('Input');
    await act(async () => {
      wrapper.at(0).prop('onChange')({
        target: { name: 'password', value: testUserProfileEditInput.password },
      });
      wrapper.at(1).prop('onChange')({
        target: {
          name: 'passwordConfirm',
          value: testUserProfileEditInput.passwordConfirm,
        },
      });
      wrapper.at(2).prop('onChange')({
        target: { name: 'username', value: testUserProfileEditInput.username },
      });
      wrapper.at(3).prop('onChange')({
        target: {
          name: 'firstName',
          value: testUserProfileEditInput.firstName,
        },
      });
      wrapper.at(4).prop('onChange')({
        target: { name: 'lastName', value: testUserProfileEditInput.lastName },
      });
      wrapper.at(5).prop('onChange')({
        target: {
          name: 'phoneNumber',
          value: testUserProfileEditInput.phoneNumber,
        },
      });
      wrapper = component.find('Checkbox');
      wrapper.at(0).prop('onChange')({
        target: { name: 'gender', value: testUserProfileEditInput.gender },
      });
      wrapper = component.find(DatePicker);
      wrapper.prop('onChange')(new Date(), testUserProfileEditInput.birthdate);
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      // console.log(wrapper.debug());
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    // should submit with correct input
    expect(spyUserProfileEdit).toHaveBeenCalledWith(
      stubUser.currentUser.id,
      testUserProfileEditInfo,
    );
  });

  it('should render nothing without errors without current user', () => {
    const component = mount(userProfileEditNoUser);
    const wrapper = component.find('.UserProfileEdit');
    expect(wrapper.length).toBe(0);
  });
});
