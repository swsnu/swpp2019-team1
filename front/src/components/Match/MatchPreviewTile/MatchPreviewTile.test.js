import React from 'react';
import { shallow } from 'enzyme';
import MatchPreviewTile from './MatchPreviewTile';

const mockHandler = () => {};

describe('<MatchPreviewTile />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <MatchPreviewTile
        page="Home"
        title="Title"
        host="Host"
        location="Test Location"
        time="2019-11-12T06:29:50.304Z"
        numParticipants={2}
        capacity={3}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('#HomeMatchPreviewTile');
    expect(wrapper.length).toBe(1);
  });
});
