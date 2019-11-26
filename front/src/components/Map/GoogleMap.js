import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import sf from 'sf';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsApi: null,
    };
  }

  apiLoaded = (map, maps) => {
    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsApi: maps,
    });
    const { center, locationText } = this.props;
    // eslint-disable-next-line no-unused-vars
    const marker = new maps.Marker({
      position: center,
      map,
      title: locationText,
    });
  };

  renderMarkers = places => {
    const { mapInstance } = this.state;
    const { mapsApi } = this.state;
    // eslint-disable-next-line no-unused-vars
    const marker = new mapsApi.Marker({
      position: places[0].geometry.location,
      map: mapInstance,
      title: places[0].name,
    });
  };

  renderMap = places => {
    const { mapInstance } = this.state;
    const { zoom } = this.props;

    if (places[0].geometry.viewport) {
      mapInstance.fitBounds(places[0].geometry.viewport);
    } else {
      mapInstance.setCenter(places[0].geometry.location);
      mapInstance.setZoom(zoom);
    }
  };

  onPlacesChanged = places => {
    if (!places[0].geometry) return;
    const { setFieldValue, isForm } = this.props;
    this.renderMap(places);
    this.renderMarkers(places);
    if (isForm) {
      setFieldValue('locationLatitude', places[0].geometry.location.lat());
      setFieldValue('locationLongitude', places[0].geometry.location.lng());
      setFieldValue(
        'locationText',
        sf('{1}, {0}', places[0].name, places[0].formatted_address),
      );
    }
  };

  render() {
    const { mapsApiLoaded, mapInstance, mapsApi } = this.state;
    const { center, zoom, isForm, height, width } = this.props;
    return (
      <div className="GoogleMap">
        {mapsApiLoaded && isForm && (
          <SearchBox
            map={mapInstance}
            mapsApi={mapsApi}
            onPlacesChanged={this.onPlacesChanged}
          />
        )}
        <div style={{ height, width }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDAoCLA1ph2m58Gq97sfoUuAw9UvlkdYjU',
              libraries: ['places', 'drawing'],
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              this.apiLoaded(map, maps);
            }}
          />
        </div>
      </div>
    );
  }
}
GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  isForm: PropTypes.bool,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  locationText: PropTypes.string,
  setFieldValue: PropTypes.func,
};

GoogleMap.defaultProps = {
  isForm: null,
  locationText: '',
  setFieldValue: null,
};
export default GoogleMap;
