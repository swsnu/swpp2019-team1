import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { SubmitButton } from 'formik-antd';
import MatchForm, {
  MatchPropTypes,
} from '../../../../components/Match/MatchForm/MatchForm';
import * as actionCreators from '../../../../store/actions';
// import LocationPopUp from ''

const editButton = (
  <SubmitButton className="EditButton" type="primary">
    Edit
  </SubmitButton>
);
class MatchEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
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
      // isPeriodic: false,
      // period: 0,
      // isAgeRestricted: false,
      // restrictAgeFrom: 0,
      // restrictAgeTo: 0,
      // isGenderRestricted: false,
      // restrictMale: false,
      // restrictFemale: false,
    };
  }

  componentDidMount() {
    const { match, onGetMatch } = this.props;
    onGetMatch(match.params.id);
    new Promise(resolve => setTimeout(resolve, 100)).then(() => {
      const { selected } = this.props;
      this.setState(selected);
    });
  }

  // TODO
  // onClickCreate = () => {};

  // this will be implemented or removed after applying Google Map API
  // handleLocationSearch = () => {};

  onClickEdit = matchFormInfo => {
    const { onEdit } = this.props;

    this.setState(prevState => ({ ...prevState, ...matchFormInfo }));
    const matchInfo = {
      ...this.state,
    };

    // matchInfo.category = matchInfo.category.indexes;
    onEdit(matchInfo.id, matchInfo);
  };

  onClickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { selected } = this.props;
    const {
      id,
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
    if (!selected || !id)
      return <div className="MatchEditLoading">Loading...</div>;
    return (
      <div className="MatchEdit">
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
          clickSubmit={this.onClickEdit}
          submitButton={editButton}
          clickCancel={this.onClickCancel}
        />
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
    onGetMatch: mid => dispatch(actionCreators.getMatch(mid)),
    onEdit: (id, editMatchInfo) =>
      dispatch(actionCreators.editMatch(id, editMatchInfo)),
  };
};

MatchEdit.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  onEdit: PropTypes.func.isRequired,
  onGetMatch: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    ...MatchPropTypes,
  }),
};

MatchEdit.defaultProps = {
  selected: undefined,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MatchEdit));
