import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      onGetHotMatch,
      onGetNewMatch,
      onGetRecommendMatch,
      uid,
    } = this.props;

    onGetHotMatch();
    onGetNewMatch();
    onGetRecommendMatch(uid);
    /*
    Get New, Hot, Recommend from server
    */
  }

  // TODO match should be input
  matchToComponent = () => {
    return <HomeMatchTile />;
  };

  render() {
    const { matchHot, matchNew, matchRecommend } = this.props;
    const componentHot = matchHot.map(this.matchToComponent);
    const componentNew = matchNew.map(this.matchToComponent);
    const componentRecommend = matchRecommend.map(this.matchToComponent);
    return (
      <div className="HomePage">
        <div className="HomeCategory Hot-match">{componentHot}</div>
        <div className="HomeCategory New-match">{componentNew}</div>
        <div className="HomeCategory Recommend-match">{componentRecommend}</div>
      </div>
    );
  }
}
HomePage.propTypes = {
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
};

const mapStateToProps = state => {
  return {
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
