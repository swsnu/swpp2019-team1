import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Card, Col, Row, Button, Icon } from 'antd';

import * as actionCreators from '../../store/actions/index';
import MatchPreviewTile from '../../components/Match/MatchPreviewTile/MatchPreviewTile';

import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { inputText: '' };
  }

  async componentDidMount() {
    const { getHotMatch, getNewMatch, getRecommendMatch } = this.props;
    getHotMatch();
    getNewMatch();
    await new Promise(resolve => setTimeout(resolve, 50));
    const { currentUser } = this.props;
    if (currentUser) getRecommendMatch();
  }

  matchToComponent = match => {
    const { onClickMatch } = this.props;
    return (
      <Col span={8} key={match.id}>
        <MatchPreviewTile
          page="Home"
          match={match}
          clickHandler={() => onClickMatch(match.id)}
        />
      </Col>
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
              color: '',
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
                placeholderTextColor="lightpurple"
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
        {currentUser !== null && (
          <div className="HomeCategory Recommend-match">
            <Card
              title={<span style={{ fontSize: 35 }}>Recommended Matches</span>}
            >
              <Row gutter={[16, 16]}>{componentRecommend}</Row>
            </Card>
          </div>
        )}
        <div className="HomeCategory Hot-match">
          <Card title={<span style={{ fontSize: 35 }}>Hot Matches</span>}>
            <Row gutter={[16, 16]}>{componentHot}</Row>
          </Card>
        </div>
        <div className="HomeCategory New-match">
          <Card title={<span style={{ fontSize: 35 }}>New Matches</span>}>
            <Row gutter={[16, 16]}>{componentNew}</Row>
          </Card>
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  matchHot: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      locationText: PropTypes.string,
      timeBegin: PropTypes.string,
      timeEnd: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
      matchThumbnail: PropTypes.string,
    }),
  ).isRequired,
  matchNew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      locationText: PropTypes.string,
      timeBegin: PropTypes.string,
      timeEnd: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
      matchThumbnail: PropTypes.string,
    }),
  ).isRequired,
  matchRecommend: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      host: PropTypes.string,
      locationText: PropTypes.string,
      timeBegin: PropTypes.string,
      timeEnd: PropTypes.string,
      numParticipants: PropTypes.number,
      capacity: PropTypes.number,
      matchThumbnail: PropTypes.string,
    }),
  ).isRequired,
  getHotMatch: PropTypes.func.isRequired,
  getNewMatch: PropTypes.func.isRequired,
  getRecommendMatch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
  getNlpResult: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};
HomePage.defaultProps = {
  currentUser: null,
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
