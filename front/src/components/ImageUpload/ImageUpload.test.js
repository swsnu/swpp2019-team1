import React from 'react';
import { shallow, mount } from 'enzyme';
import ImageUpload from './ImageUpload';

describe('<ImageUpload />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const component = shallow(<ImageUpload setFieldValue={() => null} />);
    const wrapper = component.find('Upload');
    expect(wrapper.length).toBe(1);
  });
  it('should call handleChange when clicked', () => {
    const fileContents = 'file contents';
    const file = new Blob([fileContents], { type: 'image/png' });
    const spySetFieldValue = jest.fn();
    const component = mount(<ImageUpload setFieldValue={spySetFieldValue} />);
    const wrapper = component.find('Upload');
    wrapper.at(0).simulate('change', { target: { files: [file] } });
    expect(spySetFieldValue).toBeCalledTimes(0);
  });
});
