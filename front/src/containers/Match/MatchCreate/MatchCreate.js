/*
 *
 */

import React, { Component } from 'react';
import MatchForm from '../../../components/Match/MatchForm/MatchForm';
// import LocationPopUp from ''

class MatchCreate extends Component {
  static validateForm() {}

  static onClickCreate() {}

  static handleLocationSearch() {}

  static handleInputXXXChange() {}

  constructor(props) {
    // default values
    super();
    this.state = {
      matchName: 0,
      // matchThumbnail: file,
      categoryID: 0,
      maxCapacity: 0,
      locationText: '',
      locationLatitude: '',
      locationLongitude: '',
      timeBegin: new Date(),
      timeEnd: new Date(),
      interval: 0,
      restrictAgeFrom: 0,
      restrictAgeTo: 0,
      restrictGender: 0,
      additionalInfo: '',
      isOnline: false,
      isPeriodic: false,
      isAgeRestricted: false,
      isGenderRestricted: false,
    };
  }

  componentDidMount() {}

  render() {
    // test coverage
    this.validateForm();
    this.onClickCreate();
    this.handleInputXXXChange();
    this.handleLocationSearch();

    return (
      <div className="MatchCreate">
        MatchCreate e
        <MatchForm />
        {/* <LocationPopUp /> */}
        <button type="button">Create</button>
      </div>
    );
  }
}

export default MatchCreate;
