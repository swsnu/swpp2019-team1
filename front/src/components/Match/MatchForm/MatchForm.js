import React from 'react';
import PropTypes from 'prop-types';

const MatchForm = ({
  title,
  // matchThumbnail,
  categoryID,
  maxCapacity,
  isOnline,
  locationText,
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude,
  // locationLongitude,
  timeStart,
  timeEnd,
  additionalInfo,
  isPeriodic,
  interval,
  isAgeRestricted,
  restrictAgeFrom,
  restrictAgeTo,
  isGenderRestricted,
  // restrictToMale and restrictToFemale will be implemented later with CSS
  // restrictToMale,
  // restrictToFemale,
  handleInputTitleChange,
  handleInputCategoryIDChange,
  handleInputMaxCapacityChange,
  handleInputIsOnlineChange,
  handleInputLocationTextChange,
  // handleInputLocationLatitudeChange,
  // handleInputLocationLongitudeChange,
  handleInputTimeStartChange,
  handleInputTimeEndChange,
  handleInputAdditionalInfoChange,
  handleInputIsPeriodicChange,
  handleInputIntervalChange,
  handleInputIsAgeRestrictedChange,
  handleInputRestrictAgeFromChange,
  handleInputRestrictAgeToChange,
  handleInputIsGenderRestrictedChange,
  handleButtonRestrictToMaleClicked,
  handleButtonRestrictToFemaleClicked,
}) => {
  return (
    <div className="MatchForm">
      <h1>Create Activity</h1>
      Title
      <input
        id="match-title-input"
        type="text"
        value={title}
        onChange={handleInputTitleChange}
      />
      <button type="button">Upload Thumbnail</button>
      <br />
      Category
      <input
        id="match-category-id-input"
        type="text"
        value={categoryID}
        onChange={handleInputCategoryIDChange}
      />
      Up to
      <input
        id="match-max-capacity-input"
        type="number"
        value={maxCapacity}
        onChange={handleInputMaxCapacityChange}
      />
      people
      <br />
      Location
      <input
        id="match-location-text-input"
        type="text"
        value={locationText}
        onChange={handleInputLocationTextChange}
      />
      Online
      <input
        id="match-is-online-input"
        type="checkbox"
        checked={isOnline}
        onChange={handleInputIsOnlineChange}
      />
      <br />
      Event Start
      <br />
      Date
      <input
        id="match-start-date-input"
        type="date"
        value={`${timeStart.getFullYear()}-${`0${timeStart.getMonth() +
          1}`.slice(-2)}-${`0${timeStart.getDate()}`.slice(-2)}`}
        onChange={handleInputTimeStartChange}
      />
      Time
      <input
        id="match-start-time-input"
        type="time"
        value={`${`0${timeStart.getHours()}`.slice(
          -2,
        )}:${`0${timeStart.getMinutes()}`.slice(-2)}`}
        onChange={handleInputTimeStartChange}
      />
      Periodic
      <input
        id="match-is-periodic-input"
        type="checkbox"
        checked={isPeriodic}
        onChange={handleInputIsPeriodicChange}
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
        onChange={handleInputTimeEndChange}
      />
      Time
      <input
        id="match-end-time-input"
        type="time"
        value={`${`0${timeEnd.getHours()}`.slice(
          -2,
        )}:${`0${timeEnd.getMinutes()}`.slice(-2)}`}
        onChange={handleInputTimeEndChange}
      />
      Every
      <input
        id="match-interval-input"
        type="number"
        value={interval}
        onChange={handleInputIntervalChange}
        disabled={!isPeriodic}
      />
      days
      <br />
      Additional Information
      <input
        id="match-additional-info-input"
        type="text"
        value={additionalInfo}
        onChange={handleInputAdditionalInfoChange}
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
        onChange={handleInputIsAgeRestrictedChange}
      />
      From
      <input
        id="match-restrict-age-from-input"
        type="number"
        value={restrictAgeFrom}
        onChange={handleInputRestrictAgeFromChange}
        disabled={!isAgeRestricted}
      />
      To
      <input
        id="match-restrict-age-to-input"
        type="number"
        value={restrictAgeTo}
        onChange={handleInputRestrictAgeToChange}
        disabled={!isAgeRestricted}
      />
      Gender
      <input
        id="match-is-gender-restricted-input"
        type="checkbox"
        checked={isGenderRestricted}
        onChange={handleInputIsGenderRestrictedChange}
      />
      <input
        id="match-restrict-to-male-input"
        type="button"
        value="M"
        disabled={!isGenderRestricted}
        onClick={handleButtonRestrictToMaleClicked}
      />
      <input
        id="match-restrict-to-female-input"
        type="button"
        value="F"
        disabled={!isGenderRestricted}
        onClick={handleButtonRestrictToFemaleClicked}
      />
    </div>
  );
};
MatchForm.propTypes = {
  title: PropTypes.string.isRequired,
  // matchThumbnail,
  categoryID: PropTypes.number.isRequired,
  maxCapacity: PropTypes.number.isRequired,
  isOnline: PropTypes.bool.isRequired,
  locationText: PropTypes.string.isRequired,
  // latitude and longitude will be implemented or removed after applying Google Map API
  // locationLatitude: PropTypes.number.isRequired,
  // locationLongitude: PropTypes.number.isRequired,
  timeStart: PropTypes.instanceOf(Date).isRequired,
  timeEnd: PropTypes.instanceOf(Date).isRequired,
  additionalInfo: PropTypes.string.isRequired,
  isPeriodic: PropTypes.bool.isRequired,
  interval: PropTypes.number.isRequired,
  isAgeRestricted: PropTypes.bool.isRequired,
  restrictAgeFrom: PropTypes.number.isRequired,
  restrictAgeTo: PropTypes.number.isRequired,
  isGenderRestricted: PropTypes.bool.isRequired,
  // restrictToMale and restrictToFemale will be implemented later with CSS
  // restrictToMale: PropTypes.bool.isRequired,
  // restrictToFemale: PropTypes.bool.isRequired,
  handleInputTitleChange: PropTypes.func.isRequired,
  handleInputCategoryIDChange: PropTypes.func.isRequired,
  handleInputMaxCapacityChange: PropTypes.func.isRequired,
  handleInputIsOnlineChange: PropTypes.func.isRequired,
  handleInputLocationTextChange: PropTypes.func.isRequired,
  // handleInputLocationLatitudeChange: PropTypes.func.isRequired,
  // handleInputLocationLongitudeChange: PropTypes.func.isRequired,
  handleInputTimeStartChange: PropTypes.func.isRequired,
  handleInputTimeEndChange: PropTypes.func.isRequired,
  handleInputAdditionalInfoChange: PropTypes.func.isRequired,
  handleInputIsPeriodicChange: PropTypes.func.isRequired,
  handleInputIntervalChange: PropTypes.func.isRequired,
  handleInputIsAgeRestrictedChange: PropTypes.func.isRequired,
  handleInputRestrictAgeFromChange: PropTypes.func.isRequired,
  handleInputRestrictAgeToChange: PropTypes.func.isRequired,
  handleInputIsGenderRestrictedChange: PropTypes.func.isRequired,
  handleButtonRestrictToMaleClicked: PropTypes.func.isRequired,
  handleButtonRestrictToFemaleClicked: PropTypes.func.isRequired,
};
export default MatchForm;
