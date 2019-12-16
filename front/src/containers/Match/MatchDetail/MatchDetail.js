import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';
import Moment from 'moment';
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
    window.scrollTo(0, 0);
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
    const { match, onJoinMatch, currentUser, onGoSignIn } = this.props;
    if (currentUser === null) onGoSignIn();
    onJoinMatch(match.params.id);
    window.location.reload();
  };

  clickQuitHandler = () => {
    const { match, onQuitMatch } = this.props;
    onQuitMatch(match.params.id);
    window.location.reload();
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
        <div className="MatchDetailButtons">
          <Button
            type="primary"
            id="enter-chatroom-button"
            onClick={this.clickChatRoomHandler}
          >
            Chatroom
          </Button>
          {selected.hostUser.id === userid ? (
            <Button
              id="edit-match-button"
              onClick={() => this.clickEditHandler()}
            >
              Edit
            </Button>
          ) : (
            <Button
              type="danger"
              id="quit-match-button"
              onClick={() => this.clickQuitHandler()}
            >
              Quit
            </Button>
          )}
        </div>
      );
    return (
      <div className="MatchDetailButtons">
        <Button
          type="primary"
          id="join-match-button"
          onClick={() => this.clickJoinHandler()}
          disabled={selected.capacity <= selected.numParticipants}
        >
          Join
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
            <div className="Detail-Middle">
              <span className="category">{selected.categoryName}</span> <br />
              <div className="Detail-Date-Host">
                <i className="material-icons">calendar_today</i>
                {selected.timeBegin.format('YYYY/MM/DD, h:mm a')}
                {this.renderPeriod(selected.period)}
                <span className="host">
                  <i className="material-icons">account_circle</i>
                  <Button
                    type="link"
                    className="host"
                    id="host-profile-button"
                    onClick={() => this.clickUserHandler()}
                  >
                    {selected.hostUser.username}
                  </Button>
                </span>
                <div className="Detail-Place">
                  <i className="material-icons">storefront</i>
                  {selected.locationText}
                </div>
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
              width="93%"
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
              style={{ stroke: '#305e34', strokeWidth: 8 }}
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
              style={{ stroke: '#305e34', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          <img src={selected.matchThumbnail} alt="No Pic" />
          <div id="additional-info-text">{selected.additionalInfo}</div>
          <svg height="15" width="96%">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              style={{ stroke: '#305e34', strokeWidth: 8 }}
            />
            Your browser does not support inline SVG.
          </svg>
          {this.renderButtons(selected, currentUser ? currentUser.id : 0)}
        </div>
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
    onGoSignIn: () => dispatch(push('/signin')),
  };
};

MatchDetail.propTypes = {
  selected: PropTypes.shape({
    ...MatchPropTypes,
    hostUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    participants: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    numParticipants: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    timeBegin: PropTypes.instanceOf(Moment),
    timeEnd: PropTypes.instanceOf(Moment),
    locationText: PropTypes.string.isRequired,
    locationLatitude: PropTypes.number.isRequired,
    locationLongitude: PropTypes.number.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    matchThumbnail: PropTypes.string.isRequired,
    period: PropTypes.number.isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onGetMatch: PropTypes.func.isRequired,
  onJoinMatch: PropTypes.func.isRequired,
  onQuitMatch: PropTypes.func.isRequired,
  onEditMatch: PropTypes.func.isRequired,
  onUserProfile: PropTypes.func.isRequired,
  onGoSignIn: PropTypes.func.isRequired,
  onClickChatRoom: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
MatchDetail.defaultProps = { selected: undefined, currentUser: null };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchDetail);
