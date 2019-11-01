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

class MatchCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      // matchThumbnail
      categoryID: 0,
      maxCapacity: 0,
      isOnline: false,
      locationText: '',
      // latitude and longitude will be implemented or removed after applying Google Map API
      // locationLatitude: '',
      // locationLongitude: '',
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

  // TODO
  // onClickCreate = () => {};

  // this will be implemented or removed after applying Google Map API
  // handleLocationSearch = () => {};

  handleInputTitleChange = event =>
    this.setState({ title: event.target.value });

  // handleNewMatchThumbnailUploaded

  // TODO : implement dropdown
  handleInputCategoryIDChange = event =>
    this.setState({ categoryID: event.target.value });

  handleInputMaxCapacityChange = event =>
    this.setState({ maxCapacity: event.target.value });

  handleInputIsOnlineChange = event =>
    this.setState({ isOnline: event.target.checked });

  handleInputLocationTextChange = event =>
    this.setState({ locationText: event.target.value });

  // handleInputLocationLatitudeChange = event =>
  //   this.setState({ locationLatitude: event.target.value });

  // handleInputLocationLongitudeChange = event =>
  //   this.setState({ locationLongitude: event.target.value });

  handleInputTimeStartChange = event => {
    const { timeStart } = this.state;
    const inputDate = event.target.value;
    const newDate = timeStart;
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
    this.setState({ timeStart: newDate });
  };

  // TODO: alert error message if the end time earlier than the start time
  handleInputTimeEndChange = event => {
    const { timeEnd } = this.state;
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

  // TODO : if setting one while the other is true -> set the other as false
  handleButtonRestrictToMaleClicked = () => {
    const { restrictToMale } = this.state;
    this.setState({ restrictToMale: !restrictToMale });
  };

  handleButtonRestrictToFemaleClicked = () => {
    const { restrictToFemale } = this.state;
    this.setState({ restrictToFemale: !restrictToFemale });
  };

  onClickCreate = () => {
    const { onCreate } = this.props;
    const { timeStart, timeEnd } = this.state;
    onCreate({
      ...this.state,
      timeStart: [
        timeStart.getFullYear(),
        timeStart.getMonth(),
        timeStart.getDate(),
        timeStart.getHours(),
        timeStart.getMinutes(),
      ],
      timeEnd: [
        timeEnd.getFullYear(),
        timeEnd.getMonth(),
        timeEnd.getDate(),
        timeEnd.getHours(),
        timeEnd.getMinutes(),
      ],
    });
  };

  render() {
    const {
      title,
      // matchThumbnail
      categoryID,
      maxCapacity,
      isOnline,
      locationText,
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
      restrictToMale,
      restrictToFemale,
    } = this.state;

    return (
      <div className="MatchCreate">
        <MatchForm
          title={title}
          // matchThumbnail
          categoryID={categoryID}
          maxCapacity={maxCapacity}
          isOnline={isOnline}
          locationText={locationText}
          // locationLatitude={locationLatitude}
          // locationLongitude={locationLongitude}
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
          handleInputTitleChange={this.handleInputTitleChange}
          handleInputCategoryIDChange={this.handleInputCategoryIDChange}
          handleInputMaxCapacityChange={this.handleInputMaxCapacityChange}
          handleInputIsOnlineChange={this.handleInputIsOnlineChange}
          handleInputLocationTextChange={this.handleInputLocationTextChange}
          // handleInputLocationLatitudeChange={
          //   this.handleInputLocationLatitudeChange
          // }
          // handleInputLocationLongitudeChange={
          //   this.handleInputLocationLongitudeChange
          // }
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
