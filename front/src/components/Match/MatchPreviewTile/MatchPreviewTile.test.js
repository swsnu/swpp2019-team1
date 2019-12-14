import React from 'react';
import { shallow } from 'enzyme';
import MatchPreviewTile from './MatchPreviewTile';

const mockHandler = () => {};
const testMatch = {
  id: 1,
  title: 'TestTitle',
  hostUser: {
    id: 1,
    username: 'TEST_HOST_USER',
  },
  locationText: 'Test Location',
  timeBegin: '2019-11-12T06:29:50.304Z',
  timeEnd: '2019-11-12T06:29:50.304Z',
  numParticipants: 2,
  capacity: 4,
  category: {
    indexes: '[0]',
  },
};
describe('<MatchPreviewTile />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <MatchPreviewTile
        page="TestPage"
        match={testMatch}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('.TestPageMatchPreviewTile');
    expect(wrapper.length).toBe(1);
  });
});
