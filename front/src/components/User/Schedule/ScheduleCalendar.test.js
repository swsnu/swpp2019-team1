import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { Calendar } from 'antd';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import getMockStore from '../../../test-utils/getMockStore';
import { history } from '../../../store/store';
import ScheduleCalendar from './ScheduleCalendar';

jest.mock('./ScheduleTable', () => () => 'ScheduleTable');

const authenticatedUser = {
  currentUser: {
    id: 1,
  },
};
const dummyMatch = {};
const mockStore = getMockStore(authenticatedUser, dummyMatch);

const testMatch = {
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
  timeEnd: moment('2019-11-07T00:35:38.334Z'),
  isPeriodic: false,
  period: 0,
  isAgeRestricted: false,
  restrictAgeFrom: 0,
  restrictAgeTo: 0,
  isGenderRestricted: false,
  restrictToMale: false,
  restrictToFemale: false,
  numParticipants: 1,
};
const dummyStyle = null;
describe('<ScheduleCalendar />', () => {
  let scheduleCalendar;
  beforeEach(() => {
    scheduleCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ScheduleCalendar style={dummyStyle} schedule={[testMatch]} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const component = mount(scheduleCalendar);
    const wrapper = component.find('.ScheduleCalendar');
    expect(wrapper.length).toBe(1);
  });

  it('should change value without errors', () => {
    const component = mount(scheduleCalendar);
    let wrapper = component.find(Calendar);
    const testValue = moment('20191130');
    wrapper.prop('onChange')(testValue);
    wrapper = component.find(ScheduleCalendar);
    expect(wrapper.instance().state.selectedValue).toBe(testValue);
  });
});
