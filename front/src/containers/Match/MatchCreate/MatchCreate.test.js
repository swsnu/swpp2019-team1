import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { act } from '@testing-library/react';
import { Cascader, DatePicker } from 'antd';
import { Form } from 'formik-antd';
import moment from 'moment';

import { disableDate } from '../../../components/Match/MatchForm/MatchForm';
import MatchCreate from './MatchCreate';
import getMockStore from '../../../test-utils/getMockStore';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/match';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

jest.mock('../../../components/Map/GoogleMap', () => () => 'GoogleMap');

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
const mockStore = getMockStore(stubUser, stubMatch);

describe('<MatchCreate />', () => {
  let matchCreate;
  let spyCreateMatch;
  beforeEach(() => {
    matchCreate = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MatchCreate} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyCreateMatch = jest
      .spyOn(actionCreators, 'createMatch')
      .mockImplementation(() => {
        return () => {};
      });
  });

  it('should render without errors', () => {
    const component = mount(matchCreate);
    const wrapper = component.find('.MatchCreate');
    expect(wrapper.length).toBe(1);
  });

  it('should handle input changes', async () => {
    const component = mount(matchCreate);
    // title change
    const title = 'TEST_TITLE';

    // eslint-disable-next-line no-unused-vars
    const createInstance = component
      .find(MatchCreate.WrappedComponent)
      .instance();
    // category change
    const categoryOption = {
      value: [1, 0],
      selectedOptions: [
        { value: 1, label: 'Arts & Entertainment', children: Array(14) },
        { value: 0, label: 'other*' },
      ],
    };

    const capacity = 3;
    const additionalInfo = 'TEST_ADDITIONAL_INFO';
    // eslint-disable-next-line no-unused-vars
    const locationText = 'TEST_LOCATION_TEXT';
    const timeBegin = moment();
    const timeEnd = moment();

    let wrapper = component.find(`input[name="title"]`);
    expect(wrapper.length).toBe(1);
    await act(async () => {
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
      // Thumbnail
      wrapper = component.find(ImageUpload);
      wrapper.prop('setFieldValue')(1);

      // submit without time
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(spyCreateMatch).toBeCalledTimes(0);

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
    expect(spyCreateMatch).toBeCalledTimes(1);
  });

  it('should go back on cancel', async () => {
    const component = mount(matchCreate);
    const wrapper = component.find('#cancel-button').at(0);
    wrapper.simulate('click');
  });
});
