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
        time="Test Time"
        numParticipants={2}
        capacity={3}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('#HomeMatchPreviewTile');
    expect(wrapper.length).toBe(1);
  });
});
