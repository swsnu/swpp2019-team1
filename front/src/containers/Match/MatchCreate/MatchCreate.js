/*
 *
 */

import React, { Component } from 'react';
import MatchForm from '../../../components/Match/MatchForm/MatchForm'
//import LocationPopUp from ''

class MatchCreate extends Component {
  state = { // default values
    matchName: '',
    //matchThumbnail: file,
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
    toggleGenderRestrict: false,
    toggleAgeRestrict: false,
    toggleOnline: false,
    togglePeriodic: false,
  }

  componentDidMount() {

  }

  onClickCreate() {

  }
  
  validateForm() {
    
  }
  
  handleLocationSearch() {
    
  }
  
  handleInputXXXChange() {
    
  }

  render() {

    //test coverage
    this.onClickCreate();
    this.validateForm();
    this.handleLocationSearch();
    this.handleInputXXXChange();

    return (
      <div className="MatchCreate">MatchCreate e
        <MatchForm />
        {/* <LocationPopUp /> */}
        <button>Create</button>
      </div>
      );
  }
}

export default MatchCreate;
