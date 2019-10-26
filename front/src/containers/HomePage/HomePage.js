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
    const {
      user,
      uid,
      onGetHotMatch,
      onGetNewMatch,
      onGetRecommendMatch,
    } = this.props;

    onGetHotMatch();
    onGetNewMatch();
    if (user) {
      onGetRecommendMatch(uid);
    }
  }

  // TODO match should be input
  matchToComponent = match => {
    const { onClickMatch } = this.props;
    return (
      <HomeMatchTile
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
  // TODO set types after user reducer finished
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  uid: PropTypes.number.isRequired,
  matchHot: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
  ).isRequired,
  matchNew: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
  ).isRequired,
  matchRecommend: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
  ).isRequired,
  onGetHotMatch: PropTypes.func.isRequired,
  onGetNewMatch: PropTypes.func.isRequired,
  onGetRecommendMatch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    uid: state.user.id,
    matchHot: state.match.hot,
    matchNew: state.match.new,
    matchRecommend: state.match.recommend,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetHotMatch: () => dispatch(actionCreators.getHotMatch()),
    onGetNewMatch: () => dispatch(actionCreators.getNewMatch()),
    onGetRecommendMatch: uid => dispatch(actionCreators.getRecommendMatch(uid)),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
