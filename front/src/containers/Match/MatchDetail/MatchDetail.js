import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actionCreators from '../../../store/actions/index';

class MatchDetail extends Component {
  componentDidMount() {
    this.props.onGetMatch(this.props.match.params.id);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="MatchDetail">
        <div className="Detail-Header">
          <div className="Detail-Thumbnail">
            <img src="TODO-source-directory" alt="thumbnail" />
          </div>
          <div className="Detail-MainInfo">
            <div className="Detail-MatchTitle">{match.title}</div>
            <div className="Detail-Time">{match.time}</div>
            <div className="Detail-Location">{match.location}</div>
            <div className="Detail-Host">{match.hostName}</div>
          </div>
        </div>
        <div className="Detail-Restriction">{match.restriction}</div>
        <div className="Detail-Google-Map">GoogleMapAPI</div>
        <div className="Detail-Additional-Info">{match.additionalInfo}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    match: state.match.selected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMatch: mid => dispatch(actionCreators.getMatch(mid)),
    onClickEdit: mid => dispatch(push(`/match/${mid}/edit`)),
    onClickJoin: mid => dispatch(actionCreators.joinMatch(mid)),
    onClickQuit: mid => dispatch(actionCreators.quitMatch(mid)),
    onClickUser: uid => dispatch(push(`/profile/${uid}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchDetail);
