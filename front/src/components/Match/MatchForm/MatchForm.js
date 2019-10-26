/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

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
  restrictToMale,
  restrictToFemale,
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
        value={
          timeStart.getFullYear() +
          '-' +
          ('0' + (timeStart.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + timeStart.getDate()).slice(-2)
        }
        onChange={handleInputTimeStartChange}
      />
      Time
      <input
        id="match-start-time-input"
        type="time"
        value={
          ('0' + timeStart.getHours()).slice(-2) +
          ':' +
          ('0' + timeStart.getMinutes()).slice(-2)
        }
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
        value={
          timeEnd.getFullYear() +
          '-' +
          ('0' + (timeEnd.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + timeEnd.getDate()).slice(-2)
        }
        onChange={handleInputTimeEndChange}
      />
      Time
      <input
        id="match-end-time-input"
        type="time"
        value={
          ('0' + timeEnd.getHours()).slice(-2) +
          ':' +
          ('0' + timeEnd.getMinutes()).slice(-2)
        }
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
export default MatchForm;
