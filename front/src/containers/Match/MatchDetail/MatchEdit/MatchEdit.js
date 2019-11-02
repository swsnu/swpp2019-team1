import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { push } from 'connected-react-router';
import * as actionCreators from '../../../../store/actions';
import {
  handleInputTitleChange,
  handleInputCategoryIDChange,
  handleInputCapacityChange,
  handleInputIsOnlineChange,
  handleInputLocationTextChange,
  // handleInputLocationLatitudeChange,
  // handleInputLocationLongitudeChange,
  handleInputTimeBeginChange,
  handleInputTimeEndChange,
  handleInputAdditionalInfoChange,
  handleInputIsPeriodicChange,
  handleInputPeriodChange,
  handleInputIsAgeRestrictedChange,
  handleInputRestrictAgeFromChange,
  handleInputRestrictAgeToChange,
  handleInputIsGenderRestrictedChange,
  handleButtonRestrictMaleClicked,
  handleButtonRestrictFemaleClicked,
} from '../../MatchCreate/MatchCreate';
import MatchForm from '../../../../components/Match/MatchForm/MatchForm';
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
    const { timeBegin, timeEnd, restrictMale } = this.state;
    const matchInfo = {
      ...this.state,
      timeBegin: [
        timeBegin.getFullYear(),
        timeBegin.getMonth(),
        timeBegin.getDate(),
        timeBegin.getHours(),
        timeBegin.getMinutes(),
      ],
      timeEnd: [
        timeEnd.getFullYear(),
        timeEnd.getMonth(),
        timeEnd.getDate(),
        timeEnd.getHours(),
        timeEnd.getMinutes(),
      ],
      restrictedGender: restrictMale,
    };
    delete matchInfo.restrictMale;
    delete matchInfo.restrictFemale;
    onEdit(matchInfo);
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
          handleInputTitleChange={handleInputTitleChange}
          handleInputCategoryIDChange={handleInputCategoryIDChange}
          handleInputCapacityChange={handleInputCapacityChange}
          handleInputIsOnlineChange={handleInputIsOnlineChange}
          handleInputLocationTextChange={handleInputLocationTextChange}
          // handleInputLocationLatitudeChange={
          //   this.handleInputLocationLatitudeChange
          // }
          // handleInputLocationLongitudeChange={
          //   this.handleInputLocationLongitudeChange
          // }
          handleInputTimeBeginChange={handleInputTimeBeginChange}
          handleInputTimeEndChange={handleInputTimeEndChange}
          handleInputAdditionalInfoChange={handleInputAdditionalInfoChange}
          handleInputIsPeriodicChange={handleInputIsPeriodicChange}
          handleInputPeriodChange={handleInputPeriodChange}
          handleInputIsAgeRestrictedChange={handleInputIsAgeRestrictedChange}
          handleInputRestrictAgeFromChange={handleInputRestrictAgeFromChange}
          handleInputRestrictAgeToChange={handleInputRestrictAgeToChange}
          handleInputIsGenderRestrictedChange={
            handleInputIsGenderRestrictedChange
          }
          handleButtonRestrictMaleClicked={handleButtonRestrictMaleClicked}
          handleButtonRestrictFemaleClicked={handleButtonRestrictFemaleClicked}
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
    onEdit: editMatchInfo => dispatch(actionCreators.editMatch(editMatchInfo)),
    onCancel: id => dispatch(push(`/match/${id}`)),
  };
};

MatchEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    title: PropTypes.string.isRequired,
    // matchThumbnail,
    categoryID: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    isOnline: PropTypes.bool.isRequired,
    locationText: PropTypes.string.isRequired,
    // latitude and longitude will be implemented or removed after applying Google Map API
    // locationLatitude: PropTypes.number.isRequired,
    // locationLongitude: PropTypes.number.isRequired,
    timeBegin: PropTypes.instanceOf(Date).isRequired,
    timeEnd: PropTypes.instanceOf(Date).isRequired,
    additionalInfo: PropTypes.string.isRequired,
    isPeriodic: PropTypes.bool.isRequired,
    period: PropTypes.number.isRequired,
    isAgeRestricted: PropTypes.bool.isRequired,
    restrictAgeFrom: PropTypes.number.isRequired,
    restrictAgeTo: PropTypes.number.isRequired,
    isGenderRestricted: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MatchEdit));
