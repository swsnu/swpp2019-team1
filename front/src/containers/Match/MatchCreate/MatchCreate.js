/* eslint-disable react/no-unused-state */
/*
 *
 */

import React, { Component } from 'react';
import MatchForm from '../../../components/Match/MatchForm/MatchForm';
// import LocationPopUp from ''

class MatchCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchName: '',
      // matchThumbnail
      categoryID: 0,
      maxCapacity: 0,
      isOnline: false,
      locationText: '',
      locationLatitude: '',
      locationLongitude: '',
      timeStart: new Date(),
      timeEnd: new Date(),
      additionalInfo: '',
      isPeriodic: false,
      interval: 0,
      isAgeRestricted: false,
      restrictAgeFrom: 0,
      restrictAgeTo: 0,
      isGenderRestricted: false,
      restrictToMale: false,
      restrictToFemale: false,
    };
  }

  componentDidMount() {}

  onClickCreate = () => {};

  validateForm = () => {};

  handleLocationSearch = () => {};

  handleInputMatchNameChange = event => {
    this.setState({ matchName: event.target.value });
    console.log(this.state);
  };
  // handleNewMatchThumbnailUploaded

  handleInputCategoryIDChange = event =>
    this.setState({ categoryID: event.target.value });

  handleInputMaxCapacityChange = event =>
    this.setState({ maxCapacity: event.target.value });

  handleInputIsOnlineChange = event =>
    this.setState({ isOnline: event.target.checked });

  handleInputLocationTextChange = event =>
    this.setState({ locationText: event.target.value });

  handleInputLocationLatitudeChange = event =>
    this.setState({ locationLatitude: event.target.value });

  handleInputLocationLongitudeChange = event =>
    this.setState({ locationLongitude: event.target.value });

  handleInputTimeStartChange = event => {
    var inputDate = event.target.value;
    var newDate = this.state.timeStart;

    if (inputDate.split('-').length !== 1) {
      // Date Changed
      newDate.setFullYear(parseInt(inputDate.split('-')[0]));
      newDate.setMonth(parseInt(inputDate.split('-')[1]) - 1);
      newDate.setDate(parseInt(inputDate.split('-')[2]));
    } else {
      // Time Changed
      newDate.setHours(parseInt(inputDate.split(':')[0]));
      newDate.setMinutes(parseInt(inputDate.split(':')[1]));
    }
    this.setState({ timeStart: newDate });
  };

  //TODO: alert error message if the end time earlier than the start time
  handleInputTimeEndChange = event => {
    var inputDate = event.target.value;
    var newDate = this.state.timeEnd;
    console.log(inputDate);
    if (inputDate.split('-').length !== 1) {
      // Date Changed
      newDate.setFullYear(parseInt(inputDate.split('-')[0]));
      newDate.setMonth(parseInt(inputDate.split('-')[1]) - 1);
      newDate.setDate(parseInt(inputDate.split('-')[2]));
    } else {
      // Time Changed
      newDate.setHours(parseInt(inputDate.split(':')[0]));
      newDate.setMinutes(parseInt(inputDate.split(':')[1]));
    }

    console.log(newDate);
    this.setState({ timeStart: newDate });
  };

  handleInputAdditionalInfoChange = event =>
    this.setState({ additionalInfo: event.target.value });

  handleInputIsPeriodicChange = event =>
    this.setState({ isPeriodic: event.target.checked });

  handleInputIntervalChange = event =>
    this.setState({ interval: event.target.value });

  handleInputIsAgeRestrictedChange = event =>
    this.setState({ isAgeRestricted: event.target.checked });

  handleInputRestrictAgeFromChange = event =>
    this.setState({ restrictAgeFrom: event.target.value });

  handleInputRestrictAgeToChange = event =>
    this.setState({ restrictAgeTo: event.target.value });

  handleInputIsGenderRestrictedChange = event =>
    this.setState({ isGenderRestricted: event.target.checked });

  //TODO : if setting one while the other is true -> set the other as false
  handleButtonRestrictToMaleClicked = event =>
    this.setState({ restrictToMale: !this.state.restrictToMale });

  handleButtonRestrictToFemaleClicked = event =>
    this.setState({ restrictToFemale: !this.state.restrictToFemale });

  render() {
    const {
      matchName,
      // matchThumbnail
      categoryID,
      maxCapacity,
      isOnline,
      locationText,
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
      restrictToMale,
      restrictToFemale,
    } = this.state;

    return (
      <div className="MatchCreate">
        <MatchForm
          matchName={matchName}
          // matchThumbnail
          categoryID={categoryID}
          maxCapacity={maxCapacity}
          isOnline={isOnline}
          locationText={locationText}
          locationLatitude={locationLatitude}
          locationLongitude={locationLongitude}
          timeStart={timeStart}
          timeEnd={timeEnd}
          additionalInfo={additionalInfo}
          isPeriodic={isPeriodic}
          interval={interval}
          isAgeRestricted={isAgeRestricted}
          restrictAgeFrom={restrictAgeFrom}
          restrictAgeTo={restrictAgeTo}
          isGenderRestricted={isGenderRestricted}
          restrictToMale={restrictToMale}
          restrictToFemale={restrictToFemale}
          handleInputMatchNameChange={this.handleInputMatchNameChange}
          handleInputCategoryIDChange={this.handleInputCategoryIDChange}
          handleInputMaxCapacityChange={this.handleInputMaxCapacityChange}
          handleInputIsOnlineChange={this.handleInputIsOnlineChange}
          handleInputLocationTextChange={this.handleInputLocationTextChange}
          handleInputLocationLatitudeChange={
            this.handleInputLocationLatitudeChange
          }
          handleInputLocationLongitudeChange={
            this.handleInputLocationLongitudeChange
          }
          handleInputTimeStartChange={this.handleInputTimeStartChange}
          handleInputTimeEndChange={this.handleInputTimeEndChange}
          handleInputAdditionalInfoChange={this.handleInputAdditionalInfoChange}
          handleInputIsPeriodicChange={this.handleInputIsPeriodicChange}
          handleInputIntervalChange={this.handleInputIntervalChange}
          handleInputIsAgeRestrictedChange={
            this.handleInputIsAgeRestrictedChange
          }
          handleInputRestrictAgeFromChange={
            this.handleInputRestrictAgeFromChange
          }
          handleInputRestrictAgeToChange={this.handleInputRestrictAgeToChange}
          handleInputIsGenderRestrictedChange={
            this.handleInputIsGenderRestrictedChange
          }
          handleButtonRestrictToMaleClicked={
            this.handleButtonRestrictToMaleClicked
          }
          handleButtonRestrictToFemaleClicked={
            this.handleButtonRestrictToFemaleClicked
          }
        />
        {/* <LocationPopUp /> */}
        <button type="button">Create</button>
      </div>
    );
  }
}

export default MatchCreate;
