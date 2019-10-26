import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions/index';
import HomeMatchTile from '../../components/HomeMatchTile/HomeMatchTile';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onGetHotMatch, onGetNewMatch, onGetRecommendMatch } = this.props;
    onGetHotMatch();
    onGetNewMatch();
    onGetRecommendMatch();
  }

  // TODO match should be input
  matchToComponent = match => {
    const { onClickMatch } = this.props;
    return (
      <HomeMatchTile
        key={match.id}
        title={match.title}
        host={match.host}
        location={match.location}
        time={match.time}
        capacity={match.capacity}
        clickHandler={() => onClickMatch(match.id)}
      />
    );
  };

  render() {
    const { matchHot, matchNew, matchRecommend } = this.props;
    const componentHot = matchHot.map(this.matchToComponent);
    const componentNew = matchNew.map(this.matchToComponent);
    const componentRecommend = matchRecommend.map(this.matchToComponent);
    return (
      <div className="HomePage">
        <div className="HomeCategory Hot-match">
          Hot Matches
          {componentHot}
        </div>
        <div className="HomeCategory New-match">
          New Matches
          {componentNew}
        </div>
        <div className="HomeCategory Recommend-match">
          Recommend Matches
          {componentRecommend}
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  matchHot: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
      time: PropTypes.arrayOf(PropTypes.number),
      capacity: PropTypes.number,
    }),
  ).isRequired,
  matchNew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
      time: PropTypes.arrayOf(PropTypes.number),
      capacity: PropTypes.number,
    }),
  ).isRequired,
  matchRecommend: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.arrayOf(PropTypes.number),
      time: PropTypes.arrayOf(PropTypes.number),
      capacity: PropTypes.number,
    }),
  ).isRequired,
  onGetHotMatch: PropTypes.func.isRequired,
  onGetNewMatch: PropTypes.func.isRequired,
  onGetRecommendMatch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    matchHot: state.match.hot,
    matchNew: state.match.new,
    matchRecommend: state.match.recommend,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetHotMatch: () => dispatch(actionCreators.getHotMatch()),
    onGetNewMatch: () => dispatch(actionCreators.getNewMatch()),
    onGetRecommendMatch: () => dispatch(actionCreators.getRecommendMatch()),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
