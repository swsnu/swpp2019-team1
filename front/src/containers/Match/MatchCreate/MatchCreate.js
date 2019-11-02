/*
 *  TODO : input validation + all TODOs in the lines
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../store/actions';
import MatchForm from '../../../components/Match/MatchForm/MatchForm';
// import LocationPopUp from ''

export const titleChange = (event, context) =>
  context.setState({ title: event.target.value });

// NewMatchThumbnailUploaded

// TODO : implement dropdown
export const categoryIDChange = (event, context) =>
  context.setState({ categoryID: event.target.value });

export const capacityChange = (event, context) =>
  context.setState({ capacity: event.target.value });

export const isOnlineChange = (event, context) =>
  context.setState({ isOnline: event.target.checked });

export const locationTextChange = (event, context) =>
  context.setState({ locationText: event.target.value });

// export const LocationLatitudeChange = (event, context) =>
//   context.setState({ locationLatitude: event.target.value });

// export const LocationLongitudeChange = (event, context) =>
//   context.setState({ locationLongitude: event.target.value });

export const timeBeginChange = (event, context) => {
  const { timeBegin } = context.state;
  const inputDate = event.target.value;
  const newDate = timeBegin;
  if (inputDate.split('-').length !== 1) {
    // Date Changed
    newDate.setFullYear(parseInt(inputDate.split('-')[0], 10));
    newDate.setMonth(parseInt(inputDate.split('-')[1], 10) - 1);
    newDate.setDate(parseInt(inputDate.split('-')[2], 10));
  } else {
    // Time Changed
    newDate.setHours(parseInt(inputDate.split(':')[0], 10));
    newDate.setMinutes(parseInt(inputDate.split(':')[1], 10));
  }
  context.setState({ timeBegin: newDate });
};

// TODO: alert error message if the end time earlier than the start time
export const timeEndChange = (event, context) => {
  const { timeEnd } = context.state;
  const inputDate = event.target.value;
  const newDate = timeEnd;
  if (inputDate.split('-').length !== 1) {
    // Date Changed
    newDate.setFullYear(parseInt(inputDate.split('-')[0], 10));
    newDate.setMonth(parseInt(inputDate.split('-')[1], 10) - 1);
    newDate.setDate(parseInt(inputDate.split('-')[2], 10));
  } else {
    // Time Changed
    newDate.setHours(parseInt(inputDate.split(':')[0], 10));
    newDate.setMinutes(parseInt(inputDate.split(':')[1], 10));
  }
  context.setState({ timeEnd: newDate });
};

export const additionalInfoChange = (event, context) =>
  context.setState({ additionalInfo: event.target.value });

export const isPeriodicChange = (event, context) =>
  context.setState({ isPeriodic: event.target.checked });

export const periodChange = (event, context) =>
  context.setState({ period: event.target.value });

export const isAgeRestrictedChange = (event, context) =>
  context.setState({ isAgeRestricted: event.target.checked });

export const restrictAgeFromChange = (event, context) =>
  context.setState({ restrictAgeFrom: event.target.value });

export const restrictAgeToChange = (event, context) =>
  context.setState({ restrictAgeTo: event.target.value });

export const isGenderRestrictedTogg = (event, context) =>
  context.setState({ isGenderRestricted: event.target.checked });

// TODO : if setting one while the other is true -> set the other as false
export const restrictMaleClicked = context => {
  const { restrictMale } = context.state;
  context.setState({ restrictMale: !restrictMale });
};

export const restrictFemaleClicked = context => {
  const { restrictFemale } = context.state;
  context.setState({ restrictFemale: !restrictFemale });
};

export const binder = context => {
  titleChange.bind(context);
  categoryIDChange.bind(context);
  capacityChange.bind(context);
  isOnlineChange.bind(context);
  locationTextChange.bind(context);
  // LocationLatitudeChange.bind(context)
  // LocationLongitudeChange.bind(context)
  timeBeginChange.bind(context);
  timeEndChange.bind(context);
  additionalInfoChange.bind(context);
  isPeriodicChange.bind(context);
  periodChange.bind(context);
  isAgeRestrictedChange.bind(context);
  restrictAgeFromChange.bind(context);
  restrictAgeToChange.bind(context);
  isGenderRestrictedTogg.bind(context);
  restrictMaleClicked.bind(context);
  restrictFemaleClicked.bind(context);
};
class MatchCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    binder(this);
  }

  componentDidMount() {}

  // TODO
  // onClickCreate = () => {};

  // this will be implemented or removed after applying Google Map API
  // LocationSearch = () => {};

  onClickCreate = () => {
    const { onCreate } = this.props;
    const { timeBegin, timeEnd, restrictMale } = this.state;
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
    onCreate(matchInfo);
  };

  render() {
    const {
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

    return (
      <div className="MatchCreate">
        <h1>Create Match</h1>
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
        <button
          id="match-create-button"
          type="button"
          onClick={this.onClickCreate}
        >
          Create
        </button>
      </div>
    );
  }
}
MatchCreate.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    onCreate: createMatchInfo =>
      dispatch(actionCreators.createMatch(createMatchInfo)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(withRouter(MatchCreate));
