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
      matchThumbnail: '',
      category: [],
      capacity: 2,
      locationText: '',
      locationLatitude: 37.4494771,
      locationLongitude: 126.9519515,
      timeBegin: null,
      timeEnd: null,
      additionalInfo: '',
    };
  }

  componentDidMount() {
    const { match, onGetMatch } = this.props;
    window.scrollTo(0, 0);
    onGetMatch(match.params.id);
    new Promise(resolve => setTimeout(resolve, 100)).then(() => {
      const { selected } = this.props;
      this.setState(selected);
    });
  }

  onClickEdit = matchFormInfo => {
    const { onEdit, match } = this.props;

    this.setState(prevState => ({ ...prevState, ...matchFormInfo }));
    const { timeBegin, timeEnd } = matchFormInfo;

    const matchInfo = {
      ...matchFormInfo,
      timeBegin: timeBegin.format(),
      timeEnd: timeEnd.format(),
    };

    onEdit(match.params.id, matchInfo);
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
      category,
      capacity,
      locationText,
      locationLatitude,
      locationLongitude,
      timeBegin,
      timeEnd,
      additionalInfo,
    } = this.state;
    if (!selected || !id)
      return <div className="MatchEditLoading">Loading...</div>;
    return (
      <div className="MatchEdit" style={{ marginBottom: '100px' }}>
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
