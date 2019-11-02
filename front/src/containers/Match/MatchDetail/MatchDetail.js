import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actionCreators from '../../../store/actions/index';

class MatchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match, onGetMatch } = this.props;
    onGetMatch(match.params.id);
  }

  clickEditHandler = () => {
    const { selected, onEditMatch } = this.props;
    onEditMatch(selected.id);
  };

  clickUserHandler = () => {
    const { selected, onUserProfile } = this.props;
    onUserProfile(selected.hostId);
  };

  clickJoinHandler = () => {
    const { selected, onJoinMatch } = this.props;
    onJoinMatch(selected.id);
  };

  clickQuitHandler = () => {
    const { selected, onQuitMatch } = this.props;
    onQuitMatch(selected.id);
  };

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
            <div className="Detail-Host">
              <button
                type="button"
                id="host-profile-button"
                onClick={() => this.clickUserHandler()}
              >
                {selected.hostName}
              </button>
            </div>
          </div>
        </div>
        <div className="Detail-Restriction">{selected.restriction}</div>
        <div className="Detail-Google-Map">GoogleMapAPI</div>
        <div className="Detail-Additional-Info">{selected.additionalInfo}</div>
        <div className="HostButtons">
          <button
            type="button"
            id="edit-match-button"
            onClick={() => this.clickEditHandler()}
          >
            Edit
          </button>
          <button
            type="button"
            id="join-match-button"
            onClick={() => this.clickJoinHandler()}
          >
            Join
          </button>
          <button
            type="button"
            id="quit-match-button"
            onClick={() => this.clickQuitHandler()}
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
    onEditMatch: mid => dispatch(push(`/match/${mid}/edit`)),
    onJoinMatch: mid => dispatch(actionCreators.joinMatch(mid)),
    onQuitMatch: mid => dispatch(actionCreators.quitMatch(mid)),
    onUserProfile: uid => dispatch(push(`/profile/${uid}`)),
  };
};

MatchDetail.propTypes = {
  // user: PropTypes.object.isRequired,
  selected: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  onGetMatch: PropTypes.func.isRequired,
  onJoinMatch: PropTypes.func.isRequired,
  onQuitMatch: PropTypes.func.isRequired,
  onEditMatch: PropTypes.func.isRequired,
  onUserProfile: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchDetail);
