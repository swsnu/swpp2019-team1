import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { act } from '@testing-library/react';
import { Cascader, DatePicker } from 'antd';
import { Form } from 'formik-antd';
import moment from 'moment';

import { disableDate } from '../../../../components/Match/MatchForm/MatchForm';
import MatchEdit from './MatchEdit';
import getMockStore from '../../../../test-utils/getMockStore';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/match';

jest.mock('../../../../components/Map/GoogleMap', () => () => 'GoogleMap');
const stubUser = {};
const stubMatch = {
  selected: {
    id: 1,
    hostUser: {
      id: 1,
      username: 'TEST_HOST_USER',
    },
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONAL_INFO',
    // matchThumbnail
    category: [0, 0],
    capacity: 2,
    isOnline: false,
    locationText: '',
    locationLatitude: 0,
    locationLongitude: 0,
    timeBegin: moment('2019-11-07T00:35:38.334Z'),
    timeEnd: moment(),
    isPeriodic: false,
    period: 0,
    isAgeRestricted: false,
    restrictAgeFrom: 0,
    restrictAgeTo: 0,
    isGenderRestricted: false,
    restrictToMale: false,
    restrictToFemale: false,
    numParticipants: 1,
  },
};
const stubNoSelectedMatch = {
  selected: undefined,
};
let mockStore = getMockStore(stubUser, stubMatch);
/*
jest.mock('../../../../store/actions', () => ({
  getMatch: jest.fn(id => {
    return dispatch => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
  }),
  editMatch: jest.fn(id => {
    return dispatch => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
  }),
}));
*/

describe('<MatchEdit />', () => {
  let matchEdit;
  let spyEditMatch;
  let spyGetMatch;
  beforeEach(() => {
    matchEdit = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MatchEdit} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMatch = jest
      .spyOn(actionCreators, 'getMatch')
      .mockImplementation(() => {
        return () => {};
      });
    spyEditMatch = jest
      .spyOn(actionCreators, 'editMatch')
      .mockImplementation(() => {
        return () => {};
      });
  });

  it('should render without errors', async () => {
    const component = mount(matchEdit);
    const MatchEditInstance = component
      .find(MatchEdit.WrappedComponent)
      .instance();
    MatchEditInstance.setState({ id: 1 });
    component.update();
    const wrapper = component.find('.MatchEdit');
    expect(wrapper.length).toBe(1);
    expect(spyGetMatch).toBeCalledTimes(1);
  });

  it('should handle input changes', async () => {
    const component = mount(matchEdit);
    const MatchEditInstance = component
      .find(MatchEdit.WrappedComponent)
      .instance();
    MatchEditInstance.setState({ id: 1 });
    component.update();
    // title change
    const title = 'TEST_TITLE';

    // category change
    const categoryOption = {
      value: [0, 0],
      selectedOptions: [
        { value: 0, label: 'Movie', children: Array(4) },
        { value: 0, label: 'SF' },
      ],
    };
    // eslint-disable-next-line no-unused-vars
    const category = [0, 0];
    const capacity = 3;
    const additionalInfo = 'TEST_ADDITIONAL_INFO';
    // eslint-disable-next-line no-unused-vars
    const locationText = 'TEST_LOCATION_TEXT';
    const timeBegin = moment();
    const timeEnd = moment();

    let wrapper;
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper = component.find(`input[name="title"]`);
      expect(wrapper.length).toBe(1);
      wrapper.simulate('change', { target: { name: 'title', value: title } });
      wrapper = component.find(Cascader);
      expect(wrapper.length).toBe(1);
      wrapper.prop('onChange')(
        categoryOption.value,
        categoryOption.selectedOptions,
      );
      wrapper.simulate(
        'change',
        categoryOption.value,
        categoryOption.selectedOptions,
      );

      // capacity change

      wrapper = component.find(`.ant-input-number`);
      expect(wrapper.length).toBe(1);
      wrapper.simulate('change', {
        target: { name: 'capacity', value: capacity },
      });
      // additionalInfo change
      wrapper = component.find(`textarea[name="additionalInfo"]`);
      expect(wrapper.length).toBe(1);
      wrapper.simulate('change', {
        target: { name: 'additionalInfo', value: additionalInfo },
      });

      // submit without time
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(spyEditMatch).toBeCalledTimes(1);

      // timeBegin change
      wrapper = component.find(DatePicker).at(0);
      wrapper.prop('onChange')(timeBegin);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.prop('disabledDate')(timeBegin);
      // timeEnd change
      wrapper = component.find(DatePicker).at(1);
      wrapper.prop('onChange')(timeEnd);
      // cannot get timeBegin
      wrapper.prop('disabledDate')(timeEnd);
      // bad testing
      expect(disableDate(2, 1)).toBe(true);
      // test with time
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    expect(spyEditMatch).toBeCalledTimes(2);
  });

  it('should go back on cancel', async () => {
    const component = mount(matchEdit);
    const MatchEditInstance = component
      .find(MatchEdit.WrappedComponent)
      .instance();
    MatchEditInstance.setState({ id: 1 });
    component.update();
    const wrapper = component.find('#cancel-button').at(1);
    wrapper.simulate('click');
  });

  it('should render loading', () => {
    mockStore = getMockStore(stubUser, stubNoSelectedMatch);
    matchEdit = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MatchEdit} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(matchEdit);
    const wrapper = component.find('.MatchEditLoading');
    expect(wrapper.length).toBe(1);
  });
});
