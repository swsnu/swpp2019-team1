import React from 'react';
import { shallow } from 'enzyme';
import HomeMatchTile from './HomeMatchTile';

const mockHandler = () => {};

describe('<HomeMatchTile />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <HomeMatchTile
        title="Title"
        host="Host"
        location={[1, 2]}
        time={[2019, 9, 1, 12, 23]}
        capacity={3}
        clickHandler={mockHandler}
      />,
    );
    const wrapper = component.find('#HomeMatchTile');
    expect(wrapper.length).toBe(1);
  });
});
