import React from 'react';
import PropTypes from 'prop-types';
import MatchPropTypes from '../../../containers/Match/MatchDetail/MatchDetail';

const MatchForm = ({
  title,
  // matchThumbnail,
  categoryID,
  capacity,
  isOnline,
  locationText,
  // latitude and longitude will be implemented or removed after applying Google Map API
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
  // restrictMale and restrictFemale will be implemented later with CSS
  // restrictMale,
  // restrictFemale,
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
}) => {
  return (
    <div className="MatchForm">
      Title
      <input
        id="match-title-input"
        type="text"
        value={title}
        onChange={titleChange}
      />
      <button type="button">Upload Thumbnail</button>
      <br />
      Category
      <input
        id="match-category-id-input"
        type="text"
        value={categoryID}
        onChange={categoryIDChange}
      />
      Up to
      <input
        id="match-capacity-input"
        type="number"
        value={capacity}
        onChange={capacityChange}
      />
      people
      <br />
      Location
      <input
        id="match-location-text-input"
        type="text"
        value={locationText}
        onChange={locationTextChange}
      />
      Online
      <input
        id="match-is-online-input"
        type="checkbox"
        checked={isOnline}
        onChange={isOnlineChange}
      />
      <br />
      Event Start
      <br />
      Date
      <input
        id="match-start-date-input"
        type="date"
        value={`${timeBegin.getFullYear()}-${`0${timeBegin.getMonth() +
          1}`.slice(-2)}-${`0${timeBegin.getDate()}`.slice(-2)}`}
        onChange={timeBeginChange}
      />
      Time
      <input
        id="match-start-time-input"
        type="time"
        value={`${`0${timeBegin.getHours()}`.slice(
          -2,
        )}:${`0${timeBegin.getMinutes()}`.slice(-2)}`}
        onChange={timeBeginChange}
      />
      Periodic
      <input
        id="match-is-periodic-input"
        type="checkbox"
        checked={isPeriodic}
        onChange={isPeriodicChange}
      />
      <br />
      Event Finish
      <br />
      Date
      <input
        id="match-end-date-input"
        type="date"
        value={`${timeEnd.getFullYear()}-${`0${timeEnd.getMonth() + 1}`.slice(
          -2,
        )}-${`0${timeEnd.getDate()}`.slice(-2)}`}
        onChange={timeEndChange}
      />
      Time
      <input
        id="match-end-time-input"
        type="time"
        value={`${`0${timeEnd.getHours()}`.slice(
          -2,
        )}:${`0${timeEnd.getMinutes()}`.slice(-2)}`}
        onChange={timeEndChange}
      />
      Every
      <input
        id="match-period-input"
        type="number"
        value={period}
        onChange={periodChange}
        disabled={!isPeriodic}
      />
      days
      <br />
      Additional Information
      <input
        id="match-additional-info-input"
        type="text"
        value={additionalInfo}
        onChange={additionalInfoChange}
      />
      <br />
      Restriction This matching will not be exposed to members who do not meet
      the specified conditions.
      <br />
      Age
      <input
        id="match-is-age-restricted-input"
        type="checkbox"
        checked={isAgeRestricted}
        onChange={isAgeRestrictedChange}
      />
      From
      <input
        id="match-restrict-age-from-input"
        type="number"
        value={restrictAgeFrom}
        onChange={restrictAgeFromChange}
        disabled={!isAgeRestricted}
      />
      To
      <input
        id="match-restrict-age-to-input"
        type="number"
        value={restrictAgeTo}
        onChange={restrictAgeToChange}
        disabled={!isAgeRestricted}
      />
      Gender
      <input
        id="match-is-gender-restricted-input"
        type="checkbox"
        checked={isGenderRestricted}
        onChange={isGenderRestrictedTogg}
      />
      <input
        id="match-restrict-male-input"
        type="button"
        value="M"
        disabled={!isGenderRestricted}
        onClick={restrictMaleClicked}
      />
      <input
        id="match-restrict-female-input"
        type="button"
        value="F"
        disabled={!isGenderRestricted}
        onClick={restrictFemaleClicked}
      />
    </div>
  );
};
const matchPropTypes = { ...MatchPropTypes };
delete matchPropTypes.hostID;

MatchForm.propTypes = {
  ...matchPropTypes,
  // restrictMale and restrictFemale will be implemented later with CSS
  // restrictMale: PropTypes.bool.isRequired,
  // restrictFemale: PropTypes.bool.isRequired,
  titleChange: PropTypes.func.isRequired,
  categoryIDChange: PropTypes.func.isRequired,
  capacityChange: PropTypes.func.isRequired,
  isOnlineChange: PropTypes.func.isRequired,
  locationTextChange: PropTypes.func.isRequired,
  // LocationLatitudeChange: PropTypes.func.isRequired,
  // LocationLongitudeChange: PropTypes.func.isRequired,
  timeBeginChange: PropTypes.func.isRequired,
  timeEndChange: PropTypes.func.isRequired,
  additionalInfoChange: PropTypes.func.isRequired,
  isPeriodicChange: PropTypes.func.isRequired,
  periodChange: PropTypes.func.isRequired,
  isAgeRestrictedChange: PropTypes.func.isRequired,
  restrictAgeFromChange: PropTypes.func.isRequired,
  restrictAgeToChange: PropTypes.func.isRequired,
  isGenderRestrictedTogg: PropTypes.func.isRequired,
  restrictMaleClicked: PropTypes.func.isRequired,
  restrictFemaleClicked: PropTypes.func.isRequired,
};
export default MatchForm;
