import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    const {
      mapsApi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    const {
      mapsApi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;
    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  render() {
    const { placeholder } = this.props;
    return (
      <div className="SearchBox">
        <input
          id="search-box-input"
          ref={this.searchInput}
          placeholder={!placeholder ? 'Search' : placeholder}
          type="text"
          style={{
            width: '300px',
            height: '40px',
            fontSize: '20px',
            padding: '10px',
          }}
        />
      </div>
    );
  }
}
SearchBox.propTypes = {
  mapsApi: PropTypes.shape({
    places: PropTypes.shape({
      SearchBox: PropTypes.func,
    }),
    event: PropTypes.shape({
      clearInstanceListeners: PropTypes.func,
    }),
  }).isRequired,
  placeholder: PropTypes.string,
  onPlacesChanged: PropTypes.func,
};

SearchBox.defaultProps = {
  placeholder: undefined,
  onPlacesChanged: null,
};

export default SearchBox;
