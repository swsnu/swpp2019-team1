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
    // using category : not implemented
    const { title, additionalInfo, category, locationText } = this.props;
    this.state = {
      title,
      category,
      capacity: 2,
      locationText,
      locationLatitude: 37.4494771,
      locationLongitude: 126.9519515,
      timeBegin: null,
      timeEnd: null,
      // timeRange: ['',''],
      additionalInfo,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickCreate = matchFormInfo => {
    const { onCreate } = this.props;
    const { timeBegin, timeEnd } = matchFormInfo;
    this.setState(prevState => ({
      ...prevState,
      ...matchFormInfo,
    }));
    const matchInfo = {
      ...this.state,
      timeBegin: timeBegin.format(),
      timeEnd: timeEnd.format(),
    };

    // matchInfo.category = matchInfo.category.indexes;

    onCreate(matchInfo);
  };

  // this will be implemented or removed after applying Google Map API
  // LocationSearch = () => {};
  onClickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const {
      title,
      category,
      capacity,
      locationText,
      locationLatitude,
      locationLongitude,
      timeBegin,
      timeEnd,
      additionalInfo,
    } = this.state;
    return (
      <div className="MatchCreate" style={{ marginBottom: '100px' }}>
        <MatchForm
          title={title}
          category={category}
          capacity={capacity}
          locationText={locationText}
          locationLatitude={locationLatitude}
          locationLongitude={locationLongitude}
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
  category: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string,
  additionalInfo: PropTypes.string,
  locationText: PropTypes.string,
};

MatchCreate.defaultProps = {
  title: '',
  category: null,
  additionalInfo: '',
  locationText: undefined,
};
const mapStateToProps = state => {
  return {
    category: state.match.category,
    title: state.match.title,
    additionalInfo: state.match.additionalInfo,
    locationText: state.match.locationText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreate: createMatchInfo =>
      dispatch(actionCreators.createMatch(createMatchInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MatchCreate));
