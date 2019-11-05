import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import MatchCreate from './MatchCreate';
import getMockStore from '../../../test-utils/getMockStore';
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
    // category change
    const category = 3;
    wrapper = component.find('#match-category-id-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('change', { target: { value: category } });
    expect(createInstance.state.category).toEqual(category);
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
    // restrictMale change
    const restrictMale = true;
    wrapper = component.find('#match-restrict-male-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictMale).toEqual(restrictMale);
    // restrictFemale change
    const restrictFemale = true;
    wrapper = component.find('#match-restrict-female-input');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(createInstance.state.restrictFemale).toEqual(restrictFemale);
  });

  it('should be able to create a match', () => {
    const component = mount(matchCreate);
    const wrapper = component.find('#match-create-button');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spyCreateMatch).toBeCalledTimes(1);
  });
});
