import React from 'react';
import { shallow, mount } from 'enzyme';
import ImageUpload from './ImageUpload';

const fileContent = 'TestFile';
const file = new Blob([fileContent], { type: 'text/plain' });

describe('<ImageUpload />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const component = shallow(<ImageUpload setFieldValue={jest.fn()} />);
    const wrapper = component.find('.ImageUpload');
    expect(wrapper.length).toBe(1);
  });
  it('should call handleClick when clicked', () => {
    const component = mount(<ImageUpload setFieldValue={jest.fn()} />);
    const wrapper = component.find('.ImageUpload');
    wrapper.simulate('click');
    const instance = component.instance();
    const spyHandleClick = jest
      .spyOn(instance, 'handleClick')
      .mockImplementation(() => null);
    instance.handleClick();
    expect(spyHandleClick).toHaveBeenCalledTimes(1);
  });
  it('should call setFieldValue correctly', () => {
    const spySetFieldValue = jest.fn();
    global.URL.createObjectURL = jest.fn();
    const component = shallow(<ImageUpload setFieldValue={spySetFieldValue} />);
    const instance = component.instance();
    instance.handleChange({ target: { files: [file] } });
    expect(spySetFieldValue).toHaveBeenCalledTimes(1);
    instance.handleChange({ target: { files: [null] } });
    expect(spySetFieldValue).toHaveBeenCalledTimes(2);
  });
});
