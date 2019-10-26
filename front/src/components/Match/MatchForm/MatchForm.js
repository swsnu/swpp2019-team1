/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const MatchForm = ({
  matchName,
  // matchThumbnail,
  categoryID,
  maxCapacity,
  isOnline,
  locationText,
  // latitude and longitude will be implemented or removed after applying Google Map API
  locationLatitude,
  locationLongitude,
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
  handleInputMatchNameChange,
  handleInputCategoryIDChange,
  handleInputMaxCapacityChange,
  handleInputIsOnlineChange,
  handleInputLocationTextChange,
  // latitude and longitude will be implemented or removed after applying Google Map API
  handleInputLocationLatitudeChange,
  handleInputLocationLongitudeChange,
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
        type="text"
        value={matchName}
        onChange={handleInputMatchNameChange}
      />
      <button type="button">Upload Thumbnail</button>
      <br />
      Category
      <input
        type="text"
        value={categoryID}
        onChange={handleInputCategoryIDChange}
      />
      Up to
      <input
        type="number"
        value={maxCapacity}
        onChange={handleInputMaxCapacityChange}
      />
      people
      <br />
      Location
      <input
        type="text"
        value={locationText}
        onChange={handleInputLocationTextChange}
      />
      Online
      <input
        type="checkbox"
        checked={isOnline}
        onChange={handleInputIsOnlineChange}
      />
      <br />
      Event Start
      <br />
      Date
      <input
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
        type="checkbox"
        checked={isPeriodic}
        onChange={handleInputIsPeriodicChange}
      />
      <br />
      Event Finish
      <br />
      Date
      <input
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
        type="number"
        value={interval}
        onChange={handleInputIntervalChange}
        disabled={!isPeriodic}
      />
      days
      <br />
      Additional Information
      <input
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
        type="checkbox"
        checked={isAgeRestricted}
        onChange={handleInputIsAgeRestrictedChange}
      />
      From
      <input
        type="number"
        value={restrictAgeFrom}
        onChange={handleInputRestrictAgeFromChange}
        disabled={!isAgeRestricted}
      />
      To
      <input
        type="number"
        value={restrictAgeTo}
        onChange={handleInputRestrictAgeToChange}
        disabled={!isAgeRestricted}
      />
      Gender
      <input
        type="checkbox"
        checked={isGenderRestricted}
        onChange={handleInputIsGenderRestrictedChange}
      />
      <input
        type="button"
        value="M"
        disabled={!isGenderRestricted}
        onClick={handleButtonRestrictToMaleClicked}
      />
      <input
        type="button"
        value="F"
        disabled={!isGenderRestricted}
        onClick={handleButtonRestrictToFemaleClicked}
      />
    </div>
  );
};
export default MatchForm;
