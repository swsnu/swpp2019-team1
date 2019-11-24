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
import MapWithSearchBox from '../../../components/Map/Map';

const stubUser = {};
const stubMatch = {
  selected: {
    id: 1,
    hostId: 2,
    title: 'TEST_TITLE',
    time: 'TEST_TIME',
    location: 'TEST_LOCATION',
    hostName: 'TEST_HOSTNAME',
    restriction: 'TEST_RESTRICTION',
    additionalInfo: 'TEST_ADITIONALINFO',
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

      // locationText change
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper = component.find(MapWithSearchBox);
      expect(wrapper.length).toBe(1);
      wrapper.simulate('change', {
        target: { value: '서울대학교' },
      });
      // submit without time
      wrapper = component.find(Form);
      await new Promise(resolve => setTimeout(resolve, 100));
      wrapper.simulate('submit');
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(spyCreateMatch).toBeCalledTimes(1);

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
    expect(spyCreateMatch).toBeCalledTimes(2);
  });

  it('should go back on cancel', async () => {
    const component = mount(matchCreate);
    const wrapper = component.find('#cancel-button').at(1);
    wrapper.simulate('click');
  });
});
