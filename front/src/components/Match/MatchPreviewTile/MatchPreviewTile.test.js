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
        location={[1, 2]}
        time={[2019, 9, 1, 12, 23]}
        numOfParticipants={2}
        capacity={3}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('#HomeMatchPreviewTile');
    expect(wrapper.length).toBe(1);
  });
});
