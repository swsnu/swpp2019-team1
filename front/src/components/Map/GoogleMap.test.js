import React from 'react';
import { mount } from 'enzyme';
import GoogleMapReact from 'google-map-react';

import GoogleMap from './GoogleMap';

jest.mock('./SearchBox', () => () => 'SearchBox');

describe('<GoogleMap />', () => {
  const testLocationLatitude = 0;
  const testLocationLongitude = 0;
  const testLocationText = '';
  const stubSetFieldValue = jest.fn();
  const stubMapInstance = {
    fitBounds: jest.fn(),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
  };
  const stubMarker = jest.fn(() => ({
    setMap: jest.fn(() => {}),
  }));
  let testPlaces = [
    {
      geometry: {
        location: { lat: jest.fn(), lng: jest.fn() },
        viewport: null,
      },
      name: '',
      formatted_address: '',
    },
  ];
  const stubFindPlaceFromQuery = jest.fn((request, func) =>
    func(testPlaces, 200),
  );
  const stubMapsApi = {
    Marker: stubMarker,
    places: {
      PlacesService: jest.fn(() => ({
        findPlaceFromQuery: stubFindPlaceFromQuery,
      })),
      PlacesServiceStatus: { OK: 200 },
    },
  };
  const stubFindNoPlaceFromQuery = jest.fn((request, func) =>
    func(testPlaces, 400),
  );
  const stubMapsApiNoPlaceFromQuery = {
    Marker: stubMarker,
    places: {
      PlacesService: jest.fn(() => ({
        findPlaceFromQuery: stubFindNoPlaceFromQuery,
      })),
      PlacesServiceStatus: { OK: 200 },
    },
  };
  let googleMap;
  let googleMapInForm;

  beforeEach(() => {
    testPlaces = [
      {
        geometry: {
          location: { lat: jest.fn(), lng: jest.fn() },
          viewport: null,
        },
        name: '',
        formatted_address: '',
      },
    ];
    googleMap = (
      <GoogleMap
        center={{ lat: testLocationLatitude, lng: testLocationLongitude }}
        height="400px"
        width="400px"
        zoom={15}
        LocationText={testLocationText}
      />
    );
    googleMapInForm = (
      <GoogleMap
        center={{ lat: testLocationLatitude, lng: testLocationLongitude }}
        height="400px"
        width="400px"
        zoom={15}
        LocationText={testLocationText}
        setFieldValue={stubSetFieldValue}
        isForm
      />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const component = mount(googleMap);
    const wrapper = component.find('.GoogleMap');
    expect(wrapper.length).toBe(1);
  });
  it('should render in form without errors', () => {
    const component = mount(googleMapInForm);
    const wrapper = component.find('.GoogleMap');
    expect(wrapper.length).toBe(1);
  });
  it('should render map and marker without errors', () => {
    const component = mount(googleMap);
    const wrapper = component.find(GoogleMapReact);
    wrapper.prop('onGoogleApiLoaded')({
      map: stubMapInstance,
      maps: stubMapsApi,
    });
    expect(stubFindPlaceFromQuery).toHaveBeenCalledTimes(1);
    component.instance().onPlacesChanged(testPlaces);
    expect(stubMarker).toHaveBeenCalledTimes(2);

    testPlaces[0].geometry.viewport = {};
    component.instance().onPlacesChanged(testPlaces);
    expect(stubMarker).toHaveBeenCalledTimes(3);

    testPlaces[0].geometry = null;
    component.instance().onPlacesChanged(testPlaces);
    expect(stubMarker).toHaveBeenCalledTimes(3);
  });

  it('should not render map and marker when found no place from query', () => {
    const component = mount(googleMap);
    const wrapper = component.find(GoogleMapReact);
    wrapper.prop('onGoogleApiLoaded')({
      map: stubMapInstance,
      maps: stubMapsApiNoPlaceFromQuery,
    });
    expect(stubFindNoPlaceFromQuery).toHaveBeenCalledTimes(1);
    expect(stubMarker).toHaveBeenCalledTimes(0);
  });

  it('should not call setMap when marker is null', () => {
    const component = mount(googleMap);
    const wrapper = component.find(GoogleMapReact);
    wrapper.prop('onGoogleApiLoaded')({
      map: stubMapInstance,
      maps: stubMapsApi,
    });
    expect(stubFindPlaceFromQuery).toHaveBeenCalledTimes(1);
    component.instance().setState({ marker: null });
    component.instance().onPlacesChanged(testPlaces);
    expect(stubMarker).toHaveBeenCalledTimes(2);
  });

  it('should call setFieldValue when map is in form', () => {
    const component = mount(googleMapInForm);
    const wrapper = component.find(GoogleMapReact);
    wrapper.prop('onGoogleApiLoaded')({
      map: stubMapInstance,
      maps: stubMapsApi,
    });
    component.instance().onPlacesChanged(testPlaces);
    expect(stubSetFieldValue).toHaveBeenCalledTimes(3);
  });
});
