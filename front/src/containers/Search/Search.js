import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Col, Cascader, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import { categories } from '../../store/staticData/categories';
import * as actionCreators from '../../store/actions/index';
import MatchPreviewTile from '../../components/Match/MatchPreviewTile/MatchPreviewTile';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      category: [],
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
    const { query, category } = this.state;
    let componentSearchResult = searchResult.map(this.matchToComponent);
    if (componentSearchResult.length === 0) {
      componentSearchResult = 'No Result';
    }
    return (
      <div className="Search">
        <div className="SearchOption">
          <div className="SearchTitleText">Search</div>
          <input
            id="search-general-query-field"
            placeholder="ex) Study"
            value={query}
            onChange={event => this.setState({ query: event.target.value })}
          />
          <div className="Set-Category">
            <Cascader
              name="category"
              options={categories}
              defaultValue={[]}
              placeholder="Category"
              changeOnSelect
              onChange={value => {
                this.setState({
                  category: value,
                });
              }}
            />
            <Button
              id="search-button"
              type="submit"
              block
              size="large"
              onClick={() => {
                onClickSearch(query, category);
              }}
            >
              <Icon type="search" />
              Search
            </Button>
          </div>
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
    onClickSearch: (query, category) =>
      dispatch(actionCreators.searchMatch(query, category)),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
