import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import MatchEdit from './MatchEdit';
import getMockStore from '../../../../test-utils/getMockStore';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/match';

const stubUser = {};
const stubMatch = {
  selected: {
    id: 1,
    hostID: 2,
    title: 'TEST_TITLE',
    hostName: 'TEST_HOSTNAME',
    additionalInfo: 'TEST_ADITIONALINFO',
    // matchThumbnail
    categoryId: 0,
    capacity: 0,
    isOnline: false,
    locationText: '',
    // latitude and longitude will be implemented or removed after applying Google Map API
    // locationLatitude: '',
    // locationLongitude: '',
    timeBegin: new Date(),
    timeEnd: new Date(),
    isPeriodic: false,
    period: 0,
    isAgeRestricted: false,
    restrictAgeFrom: 0,
    restrictAgeTo: 0,
    isGenderRestricted: false,
    restrictToMale: false,
    restrictToFemale: false,
  },
};
const mockStore = getMockStore(stubUser, stubMatch);

describe('<MatchEdit />', () => {
  let matchEdit;
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
  });

  it('should render without errors', () => {
    const component = mount(matchEdit);
    const wrapper = component.find('.MatchEdit');
    expect(wrapper.length).toBe(1);
  });

  it('should handle input changes', () => {
    const component = mount(matchEdit);
    // title change
    const title = 'TEST_TITLE';
    let wrapper = component.find('#match-title-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: title } });
    const createInstance = component
      .find(MatchEdit.WrappedComponent)
      .instance();
    expect(createInstance.state.title).toEqual(title);
    // categoryId change
    const categoryId = 3;
    wrapper = component.find('#match-category-id-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: categoryId } });
    expect(createInstance.state.categoryId).toEqual(categoryId);
    // capacity change
    const capacity = 3;
    wrapper = component.find('#match-capacity-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: capacity } });
    expect(createInstance.state.capacity).toEqual(capacity);
    // locationText change
    const locationText = 'TEST_LOCATION_TEXT';
    wrapper = component.find('#match-location-text-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: locationText } });
    expect(createInstance.state.locationText).toEqual(locationText);
    // isOnline change
    const isOnline = true;
    wrapper = component.find('#match-is-online-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { checked: isOnline } });
    expect(createInstance.state.isOnline).toEqual(isOnline);
    // startDate change
    const startDate = '1234-01-23';
    wrapper = component.find('#match-start-date-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: startDate } });
    expect(createInstance.state.timeBegin.getFullYear()).toEqual(
      parseInt(startDate.split('-')[0], 10),
    );
    expect(createInstance.state.timeBegin.getMonth() + 1).toEqual(
      parseInt(startDate.split('-')[1], 10),
    );
    expect(createInstance.state.timeBegin.getDate()).toEqual(
      parseInt(startDate.split('-')[2], 10),
    );
    // startTime change
    const startTime = '10:01';
    wrapper = component.find('#match-start-time-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: startTime } });
    expect(createInstance.state.timeBegin.getHours()).toEqual(
      parseInt(startTime.split(':')[0], 10),
    );
    expect(createInstance.state.timeBegin.getMinutes()).toEqual(
      parseInt(startTime.split(':')[1], 10),
    );
    // isPeriodic change
    const isPeriodic = true;
    wrapper = component.find('#match-is-periodic-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { checked: isPeriodic } });
    expect(createInstance.state.isPeriodic).toEqual(isPeriodic);
    // endDate change
    const endDate = '1357-12-30';
    wrapper = component.find('#match-end-date-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: endDate } });
    expect(createInstance.state.timeEnd.getFullYear()).toEqual(
      parseInt(endDate.split('-')[0], 10),
    );
    expect(createInstance.state.timeEnd.getMonth() + 1).toEqual(
      parseInt(endDate.split('-')[1], 10),
    );
    expect(createInstance.state.timeEnd.getDate()).toEqual(
      parseInt(endDate.split('-')[2], 10),
    );
    // endTime change
    const endTime = '15:51';
    wrapper = component.find('#match-end-time-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: endTime } });
    expect(createInstance.state.timeEnd.getHours()).toEqual(
      parseInt(endTime.split(':')[0], 10),
    );
    expect(createInstance.state.timeEnd.getMinutes()).toEqual(
      parseInt(endTime.split(':')[1], 10),
    );
    // period change
    const period = 7;
    wrapper = component.find('#match-period-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: period } });
    expect(createInstance.state.period).toEqual(period);
    // additionalInfo change
    const additionalInfo = 'TEST_ADDITIONAL_INFO';
    wrapper = component.find('#match-additional-info-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: additionalInfo } });
    expect(createInstance.state.additionalInfo).toEqual(additionalInfo);
    // isAgeRestricted change
    const isAgeRestricted = true;
    wrapper = component.find('#match-is-age-restricted-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { checked: isAgeRestricted } });
    expect(createInstance.state.isAgeRestricted).toEqual(isAgeRestricted);
    // restrictAgeFrom change
    const restrictAgeFrom = 11;
    wrapper = component.find('#match-restrict-age-from-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: restrictAgeFrom } });
    expect(createInstance.state.restrictAgeFrom).toEqual(restrictAgeFrom);
    // restrictAgeTo change
    const restrictAgeTo = 17;
    wrapper = component.find('#match-restrict-age-to-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: restrictAgeTo } });
    expect(createInstance.state.restrictAgeTo).toEqual(restrictAgeTo);
    // isGenderRestricted change
    const isGenderRestricted = true;
    wrapper = component.find('#match-is-gender-restricted-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { checked: isGenderRestricted } });
    expect(createInstance.state.isGenderRestricted).toEqual(isGenderRestricted);
    // restrictToMale change
    const restrictToMale = true;
    wrapper = component.find('#match-restrict-male-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictMale).toEqual(restrictToMale);
    // restrictToFemale change
    const restrictToFemale = true;
    wrapper = component.find('#match-restrict-female-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictFemale).toEqual(restrictToFemale);
  });

  it('should be able to create a match', () => {
    const spyEditMatch = jest
      .spyOn(actionCreators, 'editMatch')
      .mockImplementation(() => {
        return () => {};
      });
    const component = mount(matchEdit);
    const wrapper = component.find('#match-edit-button');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spyEditMatch).toBeCalledTimes(1);
  });

  it('should be able to cancel the edit', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => null);
    const component = mount(matchEdit);
    const wrapper = component.find('#match-edit-cancel-button');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/match/1');
  });
});
