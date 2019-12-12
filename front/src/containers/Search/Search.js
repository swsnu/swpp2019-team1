import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions/index';
import MatchPreviewTile from '../../components/Match/MatchPreviewTile/MatchPreviewTile';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      time: '',
      location: '',
    };
  }

  componentDidMount() {}

  matchToComponent = match => {
    const { onClickMatch } = this.props;
    return (
      <Col span={8} key={match.id}>
        <MatchPreviewTile
          page="Search"
          match={match}
          clickHandler={() => onClickMatch(match.id)}
        />
      </Col>
    );
  };

  render() {
    const { searchResult, onClickSearch } = this.props;
    const { query, time, location } = this.state;
    let componentSearchResult = searchResult.map(this.matchToComponent);
    if (componentSearchResult.length === 0) {
      componentSearchResult = 'No Result';
    }
    return (
      <div className="Search">
        <div className="SearchOption">
          <input
            id="search-general-query-field"
            value={query}
            onChange={event => this.setState({ query: event.target.value })}
          />
          <input
            id="search-time-field"
            value={time}
            onChange={event => this.setState({ time: event.target.value })}
          />
          <input
            id="search-location-field"
            value={location}
            onChange={event => this.setState({ location: event.target.value })}
          />
          <button
            type="submit"
            id="search-button"
            onClick={() => onClickSearch(query, time, location)}
          >
            Search
          </button>
        </div>
        <div className="SearchResult">{componentSearchResult}</div>
      </div>
    );
  }
}
Search.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.string,
      time: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
    }),
  ).isRequired,
  onClickSearch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    searchResult: state.match.searchResult,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickSearch: (query, time, location) =>
      dispatch(actionCreators.searchMatch(query, time, location)),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
