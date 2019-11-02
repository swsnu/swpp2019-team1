import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { push } from 'connected-react-router';
import MatchForm, {
  MatchPropTypes,
} from '../../../../components/Match/MatchForm/MatchForm';
import * as actionCreators from '../../../../store/actions';
import {
  titleChange,
  categoryIDChange,
  capacityChange,
  isOnlineChange,
  locationTextChange,
  // LocationLatitudeChange,
  // LocationLongitudeChange,
  timeBeginChange,
  timeEndChange,
  additionalInfoChange,
  isPeriodicChange,
  periodChange,
  isAgeRestrictedChange,
  restrictAgeFromChange,
  restrictAgeToChange,
  isGenderRestrictedTogg,
  restrictMaleClicked,
  restrictFemaleClicked,
} from '../../MatchCreate/MatchCreate';
// import LocationPopUp from ''

class MatchEdit extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.state = {
      id,
      title: '',
      // matchThumbnail
      categoryID: 0,
      capacity: 0,
      isOnline: false,
      locationText: '',
      // latitude and longitude will be implemented or removed after applying Google Map API
      // locationLatitude: '',
      // locationLongitude: '',
      timeBegin: new Date(),
      timeEnd: new Date(),
      additionalInfo: '',
      isPeriodic: false,
      period: 0,
      isAgeRestricted: false,
      restrictAgeFrom: 0,
      restrictAgeTo: 0,
      isGenderRestricted: false,
      restrictMale: false,
      restrictFemale: false,
    };
  }

  componentDidMount() {
    const { selected } = this.props;
    this.setState(selected);
  }

  // TODO
  // onClickCreate = () => {};

  // this will be implemented or removed after applying Google Map API
  // handleLocationSearch = () => {};

  onClickEdit = () => {
    const { onEdit } = this.props;
    const { id, timeBegin, timeEnd, restrictMale } = this.state;
    const matchInfo = {
      ...this.state,
      timeBegin: [
        timeBegin.getFullYear(),
        timeBegin.getMonth() + 1,
        timeBegin.getDate(),
        timeBegin.getHours(),
        timeBegin.getMinutes(),
      ],
      timeEnd: [
        timeEnd.getFullYear(),
        timeEnd.getMonth() + 1,
        timeEnd.getDate(),
        timeEnd.getHours(),
        timeEnd.getMinutes(),
      ],
      restrictedGender: restrictMale,
    };
    delete matchInfo.restrictMale;
    delete matchInfo.restrictFemale;
    onEdit(id, matchInfo);
  };

  render() {
    const {
      id,
      title,
      // matchThumbnail
      categoryID,
      capacity,
      isOnline,
      locationText,
      // locationLatitude,
      // locationLongitude,
      timeBegin,
      timeEnd,
      additionalInfo,
      isPeriodic,
      period,
      isAgeRestricted,
      restrictAgeFrom,
      restrictAgeTo,
      isGenderRestricted,
      restrictMale,
      restrictFemale,
    } = this.state;

    const { onCancel } = this.props;

    return (
      <div className="MatchEdit">
        <h1>Edit Match</h1>
        <MatchForm
          title={title}
          // matchThumbnail
          categoryID={categoryID}
          capacity={capacity}
          isOnline={isOnline}
          locationText={locationText}
          // locationLatitude={locationLatitude}
          // locationLongitude={locationLongitude}
          timeBegin={timeBegin}
          timeEnd={timeEnd}
          additionalInfo={additionalInfo}
          isPeriodic={isPeriodic}
          period={period}
          isAgeRestricted={isAgeRestricted}
          restrictAgeFrom={restrictAgeFrom}
          restrictAgeTo={restrictAgeTo}
          isGenderRestricted={isGenderRestricted}
          restrictMale={restrictMale}
          restrictFemale={restrictFemale}
          titleChange={event => titleChange(event, this)}
          categoryIDChange={event => categoryIDChange(event, this)}
          capacityChange={event => capacityChange(event, this)}
          isOnlineChange={event => isOnlineChange(event, this)}
          locationTextChange={event => locationTextChange(event, this)}
          // LocationLatitudeChange={
          //   event => LocationLatitudeChange
          // (event, this)}
          // LocationLongitudeChange={
          //   event => LocationLongitudeChange
          // (event, this)}
          timeBeginChange={event => timeBeginChange(event, this)}
          timeEndChange={event => timeEndChange(event, this)}
          additionalInfoChange={event => additionalInfoChange(event, this)}
          isPeriodicChange={event => isPeriodicChange(event, this)}
          periodChange={event => periodChange(event, this)}
          isAgeRestrictedChange={event => isAgeRestrictedChange(event, this)}
          restrictAgeFromChange={event => restrictAgeFromChange(event, this)}
          restrictAgeToChange={event => restrictAgeToChange(event, this)}
          isGenderRestrictedTogg={event => isGenderRestrictedTogg(event, this)}
          restrictMaleClicked={() => restrictMaleClicked(this)}
          restrictFemaleClicked={() => restrictFemaleClicked(this)}
        />
        {/* <LocationPopUp /> */}
        <button id="match-edit-button" type="button" onClick={this.onClickEdit}>
          Edit
        </button>
        <button
          id="match-edit-cancel-button"
          type="button"
          onClick={() => onCancel(id)}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.match.selected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEdit: (id, editMatchInfo) =>
      dispatch(actionCreators.editMatch(id, editMatchInfo)),
    onCancel: id => dispatch(push(`/match/${id}`)),
  };
};

MatchEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    ...MatchPropTypes,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MatchEdit));
