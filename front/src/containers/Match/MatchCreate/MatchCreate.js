/*
 *  TODO : input validation + all TODOs in the lines
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SubmitButton } from 'formik-antd';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import * as actionCreators from '../../../store/actions';
import MatchForm from '../../../components/Match/MatchForm/MatchForm';
// import LocationPopUp from ''

const createButton = (
  <SubmitButton className="CreateButton" type="primary">
    Create
  </SubmitButton>
);

class MatchCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      // matchThumbnail
      category: null,
      capacity: 2,
      locationText: '',
      // latitude and longitude will be implemented or removed after applying Google Map API
      // locationLatitude: '',
      // locationLongitude: '',
      timeBegin: null,
      timeEnd: null,
      // timeRange: ['',''],
      additionalInfo: '',
    };
  }

  componentDidMount() {}

  onClickCreate = matchFormInfo => {
    const { onCreate } = this.props;

    this.setState(prevState => ({ ...prevState, ...matchFormInfo }));
    const matchInfo = {
      ...this.state,
    };

    // matchInfo.category = matchInfo.category.indexes;

    onCreate(matchInfo);
  };

  // TODO
  // onClickCreate = () => {};

  // this will be implemented or removed after applying Google Map API
  // LocationSearch = () => {};
  onClickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      title,
      // matchThumbnail,
      category,
      capacity,
      locationText,
      // latitude and longitude will be implemented or removed after applying Google Map API
      // locationLatitude,
      // locationLongitude,
      timeBegin,
      timeEnd,
      additionalInfo,
    } = this.state;
    return (
      <div className="MatchCreate">
        <MatchForm
          title={title}
          // matchThumbnail
          category={category}
          capacity={capacity}
          locationText={locationText}
          // locationLatitude={locationLatitude}
          // locationLongitude={locationLongitude}
          timeBegin={timeBegin}
          timeEnd={timeEnd}
          additionalInfo={additionalInfo}
          // LocationLatitudeChange={
          //   event => LocationLatitudeChange
          // (event, context)}
          // LocationLongitudeChange={
          //   event => LocationLongitudeChange
          // (event, context)}
          clickSubmit={this.onClickCreate}
          submitButton={createButton}
          clickCancel={this.onClickCancel}
        />
      </div>
    );
  }
}
MatchCreate.propTypes = {
  onCreate: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
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
