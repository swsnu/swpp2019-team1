import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  let searchBox;
  let searchBoxWithoutOnPlacesChanged;
  const stubMapInstance = {};
  const stubMapsApi = { places: {}, event: {} };

  const stubClearInstanceListeners = jest.fn(() => {});
  stubMapsApi.event.clearInstanceListeners = stubClearInstanceListeners;

  const stubGetPlaces = jest.fn(() => {});
  const stubSearchBox = jest.fn(() => ({
    addListener: jest.fn(() => {}),
    getPlaces: stubGetPlaces,
  }));
  stubMapsApi.places.SearchBox = stubSearchBox;

  const stubOnPlacesChanged = jest.fn(() => {});
  beforeEach(() => {
    searchBox = (
      <SearchBox
        map={stubMapInstance}
        mapsApi={stubMapsApi}
        onPlacesChanged={stubOnPlacesChanged}
      />
    );
    searchBoxWithoutOnPlacesChanged = (
      <SearchBox
        map={stubMapInstance}
        mapsApi={stubMapsApi}
        onPlacesChanged={null}
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = shallow(searchBox);
    const wrapper = component.find('.SearchBox');
    expect(wrapper.length).toBe(1);
  });

  it('should clear instance listeners when component will unmount', () => {
    const component = mount(searchBox);
    component.instance().componentWillUnmount();
    expect(stubClearInstanceListeners).toHaveBeenCalledTimes(1);
  });

  it('should call getPlaces when onPlacesChanged is not null', () => {
    const component = mount(searchBox);
    component.instance().onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(1);
  });

  it('should not call getPlaces when onPlacesChanged is null', () => {
    const component = mount(searchBoxWithoutOnPlacesChanged);
    component.instance().onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(0);
  });
});
