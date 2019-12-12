import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { Card, Row, Button, Icon } from 'antd';

import * as actionCreators from '../../store/actions/index';
import MatchPreviewTile from '../../components/Match/MatchPreviewTile/MatchPreviewTile';

import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { inputText: '' };
  }

  componentDidMount() {
    const { getHotMatch, getNewMatch, getRecommendMatch } = this.props;
    getHotMatch();
    getNewMatch();
    getRecommendMatch();
  }

  matchToComponent = match => {
    const { onClickMatch } = this.props;
    return (
      <MatchPreviewTile
        key={match.id}
        page="Home"
        title={match.title}
        host={match.host}
        location={match.location}
        time={match.time}
        numParticipants={match.numParticipants}
        capacity={match.capacity}
        clickHandler={() => onClickMatch(match.id)}
      />
    );
  };

  onClickCreateButton = () => {
    const { getNlpResult } = this.props;
    const { inputText } = this.state;
    getNlpResult(inputText);
  };

  render() {
    const {
      history,
      matchHot,
      matchNew,
      matchRecommend,
      currentUser,
    } = this.props;
    const { inputText } = this.state;
    const componentHot = matchHot.map(this.matchToComponent);
    const componentNew = matchNew.map(this.matchToComponent);
    const componentRecommend = matchRecommend.map(this.matchToComponent);
    return (
      <div
        className="HomePage"
        style={{
          textAlign: 'center',
          fontSize: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="Home-search">
          <div
            className="Home-search-message"
            style={{ marginTop: 70, marginBottom: 15, color: 'black' }}
          >
            Find A Match
          </div>
          <Button
            id="Home-search-button"
            onClick={() => history.push('/search')}
            block
            size="large"
          >
            <Icon type="search" />
            Search
          </Button>
        </div>
        <div className="Home-create" style={{ margin: 40 }}>
          <div
            className="Home-create-message"
            style={{
              color: 'green',
            }}
          >
            Make Your Own Match
          </div>{' '}
          <div
            className="Home-create-message-powered-by"
            style={{
              marginBottom: 20,
              color: 'teal',
            }}
          >
            powered by Google NLP
          </div>
          <div className="Home-create-input">
            <View
              style={{
                borderColor: 'blue',
                borderWidth: 4,
                borderRadius: 10,
                width: 500,
                paddingVertical: 10,
                marginBottom: 20,
              }}
            >
              <TextInput
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}
                id="Home-create-textinput"
                multiline
                numberOfLines={4}
                onChangeText={text => this.setState({ inputText: text })}
                value={inputText}
                editable
                maxLength={800}
                placeholder="Tell us about your Match!"
                placeholderTextColor="blue"
              />
            </View>
          </div>
          <Button
            id="Home-create-button"
            type="primary"
            onClick={this.onClickCreateButton}
            block
            disabled={currentUser === null}
            size="large"
          >
            <Icon type="plus-circle" />
            Create Now
          </Button>
          <div>
            {currentUser === null ? (
              <div style={{ fontSize: 15 }}>You should be logged in!</div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="HomeCategory Hot-match">
          <Card title={<span style={{ fontSize: 35 }}>Hot Matches</span>}>
            <Row gutter={(16, 16)}>{componentHot}</Row>
          </Card>
        </div>
        <div className="HomeCategory New-match">
          <Card title={<span style={{ fontSize: 35 }}>New Matches</span>}>
            <Row gutter={(16, 16)}>{componentNew}</Row>
          </Card>
        </div>
        <div className="HomeCategory Recommend-match">
          <Card title={<span style={{ fontSize: 35 }}>Recommend Matches</span>}>
            <Row gutter={(16, 16)}>{componentRecommend}</Row>
          </Card>
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  matchHot: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.string,
      time: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
    }),
  ).isRequired,
  matchNew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.string,
      time: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
    }),
  ).isRequired,
  matchRecommend: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      location: PropTypes.string,
      time: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
    }),
  ).isRequired,
  getHotMatch: PropTypes.func.isRequired,
  getNewMatch: PropTypes.func.isRequired,
  getRecommendMatch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
  getNlpResult: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
const mapStateToProps = state => {
  return {
    matchHot: state.match.hot,
    matchNew: state.match.new,
    matchRecommend: state.match.recommend,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHotMatch: () => dispatch(actionCreators.getHotMatch()),
    getNewMatch: () => dispatch(actionCreators.getNewMatch()),
    getRecommendMatch: () => dispatch(actionCreators.getRecommendMatch()),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
    getNlpResult: query => dispatch(actionCreators.sendNlpText(query)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
