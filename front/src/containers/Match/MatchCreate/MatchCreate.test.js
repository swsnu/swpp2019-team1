import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import MatchCreate from './MatchCreate';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/match';

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

  it('should handle input changes', () => {
    const component = mount(matchCreate);
    // title change
    const title = 'TEST_TITLE';
    let wrapper = component.find('#match-title-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: title } });
    const createInstance = component
      .find(MatchCreate.WrappedComponent)
      .instance();
    expect(createInstance.state.title).toEqual(title);
    // categoryId change
    const categoryID = 3;
    wrapper = component.find('#match-category-id-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: categoryID } });
    expect(createInstance.state.categoryID).toEqual(categoryID);
    // maxCapacity change
    const maxCapacity = 3;
    wrapper = component.find('#match-max-capacity-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: maxCapacity } });
    expect(createInstance.state.maxCapacity).toEqual(maxCapacity);
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
    expect(createInstance.state.timeStart.getFullYear()).toEqual(
      parseInt(startDate.split('-')[0], 10),
    );
    expect(createInstance.state.timeStart.getMonth() + 1).toEqual(
      parseInt(startDate.split('-')[1], 10),
    );
    expect(createInstance.state.timeStart.getDate()).toEqual(
      parseInt(startDate.split('-')[2], 10),
    );
    // startTime change
    const startTime = '10:01';
    wrapper = component.find('#match-start-time-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: startTime } });
    expect(createInstance.state.timeStart.getHours()).toEqual(
      parseInt(startTime.split(':')[0], 10),
    );
    expect(createInstance.state.timeStart.getMinutes()).toEqual(
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
    // interval change
    const interval = 7;
    wrapper = component.find('#match-interval-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: interval } });
    expect(createInstance.state.interval).toEqual(interval);
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
    wrapper = component.find('#match-restrict-to-male-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictToMale).toEqual(restrictToMale);
    // restrictToFemale change
    const restrictToFemale = true;
    wrapper = component.find('#match-restrict-to-female-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictToFemale).toEqual(restrictToFemale);
  });

  it('should be able to create a match', () => {
    const component = mount(matchCreate);
    const wrapper = component.find('#match-create-button');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spyCreateMatch).toBeCalledTimes(1);
  });
});
