/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';
import GoogleMap from '../../../components/Map/GoogleMap';
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
    window.location.reload();
  };

  clickQuitHandler = () => {
    const { match, onQuitMatch } = this.props;
    onQuitMatch(match.params.id);
  };

  clickChatRoomHandler = () => {
    const { match, onClickChatRoom } = this.props;
    onClickChatRoom(match.params.id);
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
    if (result.length !== 0) result += <i className="material-icons">error</i>;
    return result;
  };

  renderButtons = (selected, userid) => {
    if (selected.participants.includes(userid))
      return (
        <div className="HostButtons">
          <Button
            type="primary"
            id="enter-chatroom-button"
            onClick={this.clickChatRoomHandler}
          >
            Enter Chatroom
          </Button>
          {selected.hostUser.id === userid && (
            <Button
              id="edit-match-button"
              onClick={() => this.clickEditHandler()}
            >
              Edit
            </Button>
          )}
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
            <b id="detail-title">{selected.title}</b>
            <b id="detail-capacity">
              <i className="material-icons" id="materials-icon-person">
                person
              </i>
              {this.renderCapacity(selected.numParticipants, selected.capacity)}
            </b>
            <br />
            <div className="Detail-PlaceDate-And-Host">
              <i className="material-icons">calendar_today</i>
              {selected.timeBegin.format('YYYY/MM/DD, h:mm a')}
              {this.renderPeriod(selected.period)}
              <Button
                type="link"
                id="host-profile-button"
                onClick={() => this.clickUserHandler()}
              >
                {selected.hostUser.username}
              </Button>
              <div className="Detail-Place">
                <i className="material-icons">storefront</i>
                {selected.locationText}
              </div>
            </div>
          </div>
        </div>
        {!!selected.locationText && (
          <div className="Detail-GoogleMap">
            <GoogleMap
              center={{
                lat: selected.locationLatitude,
                lng: selected.locationLongitude,
              }}
              height="700px"
              width="100%"
              zoom={15}
              locationText={selected.locationText}
            />
          </div>
        )}
        <div className="Detail-Restrictions">
          {this.renderRestrictions(selected)}
        </div>
        <div className="Detail-Additional-Info">
          <svg height="15" width="30%">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              style={{ stroke: '#0000bb', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          <span className="MatchInfo"> Match Info </span>
          <svg height="15" width="30%">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              style={{ stroke: '#0000bb', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          <img src={selected.matchThumbnail} alt="No Pic" />
          <div id="additional-info-text">{selected.additionalInfo}</div>
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
    onClickChatRoom: mid => dispatch(push(`/match/${mid}/chatroom`)),
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
    participants: PropTypes.arrayOf(PropTypes.number),
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
