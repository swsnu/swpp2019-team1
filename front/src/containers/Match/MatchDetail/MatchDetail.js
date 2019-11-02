/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actionCreators from '../../../store/actions/index';
import { MatchPropTypes } from '../../../components/Match/MatchForm/MatchForm';

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
    const { match, onEditMatch } = this.props;
    onEditMatch(match.params.id);
  };

  clickUserHandler = () => {
    const { selected, onUserProfile } = this.props;
    onUserProfile(selected.hostID);
  };

  clickJoinHandler = () => {
    const { match, onJoinMatch } = this.props;
    onJoinMatch(match.params.id);
  };

  clickQuitHandler = () => {
    const { match, onQuitMatch } = this.props;
    onQuitMatch(match.params.id);
  };

  render() {
    const { selected } = this.props;
    if (selected === undefined)
      return <div className="MatchDetail">Loading...</div>;
    return (
      <div className="MatchDetail">
        <div className="Detail-Header">
          <div className="Detail-Thumbnail">
            <img src="TODO-source-directory" alt="thumbnail" />
          </div>
          <div className="Detail-MainInfo">
            <div className="Detail-MatchTitle">{selected.title}</div>
            {/* <div className="Detail-Time">{selected.time}</div> */}
            <div className="Detail-Location">{selected.locationText}</div>
            <div className="Detail-Host">
              <button
                type="button"
                id="host-profile-button"
                onClick={() => this.clickUserHandler()}
              >
                {/* {selected.hostName} */}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="Detail-Restriction">{selected.restriction}</div> */}
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
    // user: state.user.userid,
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
  selected: PropTypes.shape({
    ...MatchPropTypes,
    hostID: PropTypes.number.isRequired,
  }),
  onGetMatch: PropTypes.func.isRequired,
  onJoinMatch: PropTypes.func.isRequired,
  onQuitMatch: PropTypes.func.isRequired,
  onEditMatch: PropTypes.func.isRequired,
  onUserProfile: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
MatchDetail.defaultProps = { selected: undefined };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchDetail);
