/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';
import GoogleMap from '../../../components/Map/Map';
import * as actionCreators from '../../../store/actions/index';
import { MatchPropTypes } from '../../../components/Match/MatchForm/MatchForm';
import './MatchDetail.css';

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
    onUserProfile(selected.hostUser.id);
  };

  clickJoinHandler = () => {
    const { match, onJoinMatch } = this.props;
    onJoinMatch(match.params.id);
  };

  clickQuitHandler = () => {
    const { match, onQuitMatch } = this.props;
    onQuitMatch(match.params.id);
  };

  renderCapacity = (numParticipants, capacity) => {
    let result = `${numParticipants}/${capacity}`;
    if (numParticipants === capacity) result += ' (Full)';
    return result;
  };

  renderPeriod = period => {
    let result = '';
    if (period !== 0) result = `The period is ${period}`;
    return result;
  };

  renderRestrictions = selected => {
    let result = '';
    if (selected.isGenderRestricted) {
      if (selected.restrictToMale) result += 'Females';
      else result += 'Males';
      if (selected.isAgeRestricted) result += ', ';
    }
    if (selected.isAgeRestricted) {
      result += `Age ${selected.restrictAgeFrom} to ${selected.restrictAgeTo}`;
    }
    return result;
  };

  renderButtons = (selected, userid) => {
    if (selected.hostUser.id === userid)
      return (
        <div className="HostButtons">
          <Button type="primary" id="enter-chatroom-button" onClick={() => {}}>
            Enter Chatroom
          </Button>
          <Button
            id="edit-match-button"
            onClick={() => this.clickEditHandler()}
          >
            Edit
          </Button>
        </div>
      );
    return (
      <div className="HostButtons">
        <Button
          type="primary"
          id="join-match-button"
          onClick={() => this.clickJoinHandler()}
        >
          Join
        </Button>
        <Button
          type="danger"
          id="quit-match-button"
          onClick={() => this.clickQuitHandler()}
        >
          Quit
        </Button>
      </div>
    );
  };

  render() {
    const { selected, currentUser, match } = this.props;
    if (selected === undefined || Number(match.params.id) !== selected.id)
      return <div className="MatchDetail">Loading...</div>;
    return (
      <div className="MatchDetail">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <div className="Detail-Header">
          <div className="Detail-MainInfo">
            <img src={selected.matchThumbnail} alt="thumb" />
            <b id="detail-title">{selected.title}</b>
            <b id="detail-capacity">
              <i className="material-icons" id="materials-icon-person">
                person
              </i>
              {this.renderCapacity(selected.numParticipants, selected.capacity)}
            </b>
            <br />
            <div className="Detail-PlaceDate">
              <i className="material-icons">calendar_today</i>
              {selected.timeBegin.format('YYYY/MM/DD, h:mm a')}
              {this.renderPeriod(selected.period)}
              <div className="Detail-Location">
                <i className="material-icons">storefront</i>
                {selected.locationText}
              </div>
            </div>
            <div className="Detail-Host">
              <button
                type="button"
                id="host-profile-button"
                onClick={() => this.clickUserHandler()}
              >
                {selected.hostUser.username}
              </button>
            </div>
          </div>
        </div>
        <div className="Detail-Restrictions">
          <i className="material-icons">error</i>
          {this.renderRestrictions(selected)}
        </div>
        <GoogleMap
          center={{
            lat: selected.locationLatitude,
            lng: selected.locationLongitude,
          }}
          height="400px"
          width="400px"
          zoom={15}
          locationText={selected.locationText}
        />
        <div className="Detail-Additional-Info">
          <svg height="15" width="280">
            <line
              x1="0"
              y1="0"
              x2="280"
              y2="0"
              style={{ stroke: '#000000', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          <span className="bold">Match Info</span>
          <svg height="15" width="280">
            <line
              x1="0"
              y1="0"
              x2="228070"
              y2="0"
              style={{ stroke: '#000000', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          {selected.additionalInfo}
        </div>
        {this.renderButtons(selected, currentUser ? currentUser.id : 0)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.match.selected,
    currentUser: state.user.currentUser,
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
    hostUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onGetMatch: PropTypes.func.isRequired,
  onJoinMatch: PropTypes.func.isRequired,
  onQuitMatch: PropTypes.func.isRequired,
  onEditMatch: PropTypes.func.isRequired,
  onUserProfile: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
MatchDetail.defaultProps = { selected: undefined, currentUser: null };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchDetail);
