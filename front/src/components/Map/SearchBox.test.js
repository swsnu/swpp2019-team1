import React from 'react';
import { mount } from 'enzyme';

import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
  let searchBox;
  let searchBoxWithoutOnPlacesChanged;
  let searchBoxBlankLocation;

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
        placeholder="301-408"
      />
    );
    searchBoxWithoutOnPlacesChanged = (
      <SearchBox
        map={stubMapInstance}
        mapsApi={stubMapsApi}
        onPlacesChanged={null}
        placeholder="301-408"
      />
    );
    searchBoxBlankLocation = (
      <SearchBox
        map={stubMapInstance}
        mapsApi={stubMapsApi}
        onPlacesChanged={stubOnPlacesChanged}
        placeholder=""
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render appropriately without errors', () => {
    const component = mount(searchBox);
    const wrapper = component.find('.SearchBox');
    expect(wrapper.length).toBe(1);
    expect(component.find('input').prop('placeholder')).toEqual('301-408');
  });

  it('should clear instance listeners when component will unmount', () => {
    const component = mount(searchBox);
    component
      .find(SearchBox)
      .instance()
      .componentWillUnmount();
    expect(stubClearInstanceListeners).toHaveBeenCalledTimes(1);
  });

  it('should call getPlaces when onPlacesChanged is not null', () => {
    const component = mount(searchBox);
    component
      .find(SearchBox)
      .instance()
      .onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(1);
  });

  it('should not call getPlaces when onPlacesChanged is null', () => {
    const component = mount(searchBoxWithoutOnPlacesChanged);
    component
      .find(SearchBox)
      .instance()
      .onPlacesChanged();
    expect(stubGetPlaces).toHaveBeenCalledTimes(0);
  });

  it('should render appropriately with blank location', () => {
    const component = mount(searchBoxBlankLocation);
    expect(component.find('input').prop('placeholder')).toEqual('Search');
  });
});
