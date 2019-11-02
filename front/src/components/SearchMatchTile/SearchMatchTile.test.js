import React from 'react';
import { shallow } from 'enzyme';
import SearchMatchTile from './SearchMatchTile';

const mockHandler = () => {};

describe('<SearchMatchTile />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <SearchMatchTile
        title="Title"
        host="Host"
        location={[1, 2]}
        time={[2019, 9, 1, 12, 23]}
        numOfParticipants={2}
        capacity={3}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('#SearchMatchTile');
    expect(wrapper.length).toBe(1);
  });
});
