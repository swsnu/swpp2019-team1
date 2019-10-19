import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actionCreators from '../../../store/actions/index';

class MatchDetail extends Component {
  componentDidMount() {
    this.props.onGetMatch(this.props.match.params.id);
  }

  render() {
    const { selected } = this.props;
    return (
      <div className="MatchDetail">
        <div className="Detail-Header">
          <div className="Detail-Thumbnail">
            <img src="TODO-source-directory" alt="thumbnail" />
          </div>
          <div className="Detail-MainInfo">
            <div className="Detail-MatchTitle">{selected.title}</div>
            <div className="Detail-Time">{selected.time}</div>
            <div className="Detail-Location">{selected.location}</div>
            <div
              className="Detail-Host"
              onClick={() => this.props.onClickUser(this.props.selected.hostId)}
            >
              {selected.hostName}
            </div>
          </div>
        </div>
        <div className="Detail-Restriction">{selected.restriction}</div>
        <div className="Detail-Google-Map">GoogleMapAPI</div>
        <div className="Detail-Additional-Info">{selected.additionalInfo}</div>
        <div className="HostButtons">
          <button
            id="edit-match-button"
            onClick={() => this.props.onClickEdit(this.props.selected.id)}
          >
            Edit
          </button>
          <button
            id="join-match-button"
            onClick={() => this.props.onClickJoin(this.props.selected.id)}
          >
            Join
          </button>
          <button
            id="quit-match-button"
            onClick={() => this.props.onClickQuit(this.props.selected.id)}
          >
            Quit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userid,
    selected: state.match.selected,
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
