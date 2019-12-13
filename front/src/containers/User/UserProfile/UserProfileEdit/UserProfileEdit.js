import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actionCreators from '../../../../store/actions';
import SignUpForm from '../../../../components/User/Auth/SignUp/SignUpForm';

class UserProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { history, currentUser } = this.props;
    if (!currentUser) history.push('/signin');
    else this.setState(currentUser);
  }

  clickProfileEditHandler = async values => {
    const { onProfileEdit, currentUser } = this.props;
    await this.setState({ ...values });
    const userInfo = {
      password: values.password,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      birthdate: values.birthdate,
    };
    onProfileEdit(currentUser.id, userInfo);
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser === null)
      return <div className="UserProfileEdit">Loading...</div>;
    return (
      <div className="UserProfileEdit">
        <SignUpForm
          password=""
          passwordConfirm=""
          username={currentUser.username}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          phoneNumber={currentUser.phoneNumber}
          gender={currentUser.gender}
          birthdate={currentUser.birthdate}
          isProfileEdit
          clickSubmit={this.clickProfileEditHandler}
        />
      </div>
    );
  }
}
UserProfileEdit.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  onProfileEdit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    gender: PropTypes.bool,
    birthdate: PropTypes.string.isRequired,
  }),
};
UserProfileEdit.defaultProps = { currentUser: null };

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onProfileEdit: (id, userInfo) =>
      dispatch(actionCreators.editUser(id, userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserProfileEdit));
