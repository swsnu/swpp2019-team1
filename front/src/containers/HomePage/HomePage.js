import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { Card, Row, Button, Icon } from 'antd';

import * as actionCreators from '../../store/actions/index';
import MatchPreviewTile from '../../components/Match/MatchPreviewTile/MatchPreviewTile';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { nlpText: '' };
  }

  componentDidMount() {
    const { onGetHotMatch, onGetNewMatch, onGetRecommendMatch } = this.props;
    onGetHotMatch();
    onGetNewMatch();
    onGetRecommendMatch();
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

  render() {
    const {
      history,
      matchHot,
      matchNew,
      matchRecommend,
      onClickNlpText,
      category,
      location,
      title,
    } = this.props;
    const { nlpText } = this.state;
    const componentHot = matchHot.map(this.matchToComponent);
    const componentNew = matchNew.map(this.matchToComponent);
    const componentRecommend = matchRecommend.map(this.matchToComponent);
    return (
      <div className="HomePage">
        <div className="Home-search">
          <div className="Home-search-message">Find a match you want</div>
          <Button
            id="Home-search-button"
            onClick={() => history.push('/search')}
            block
          >
            <Icon type="search" />
            Search
          </Button>
        </div>
        <div className="Home-create">
          <div className="Home-create-message">Make your own matching now!</div>
          <Button
            id="Home-create-button"
            type="primary"
            onClick={() => history.push('/match/create')}
            block
          >
            <Icon type="plus-circle" />
            Create Now
          </Button>
        </div>
        <div className="HomeCategory Hot-match">
          <Card title="Hot Matches">
            <Row gutter={(16, 16)}>{componentHot}</Row>
          </Card>
        </div>
        <div className="HomeCategory New-match">
          <Card title="New Matches">
            <Row gutter={(16, 16)}>{componentNew}</Row>
          </Card>
        </div>
        <div className="HomeCategory Recommend-match">
          <Card title="Recommend Matches">
            <Row gutter={(16, 16)}>{componentRecommend}</Row>
          </Card>
        </div>
        <div className="HomeCategory Nlp-Create-match">
          <input
            id="nlp-query-input-field"
            value={nlpText}
            onChange={event => this.setState({ nlpText: event.target.value })}
          />
          <button
            type="button"
            id="nlp-query-button"
            onClick={() => onClickNlpText(nlpText)}
          >
            Search
          </button>
          <p>
            category : {category}
            <br />
            location : {location}
            <br />
            title : {title}
          </p>
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
  category: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onGetHotMatch: PropTypes.func.isRequired,
  onGetNewMatch: PropTypes.func.isRequired,
  onGetRecommendMatch: PropTypes.func.isRequired,
  onClickMatch: PropTypes.func.isRequired,
  onClickNlpText: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    matchHot: state.match.hot,
    matchNew: state.match.new,
    matchRecommend: state.match.recommend,
    category: state.match.category,
    location: state.match.location,
    title: state.match.title,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetHotMatch: () => dispatch(actionCreators.getHotMatch()),
    onGetNewMatch: () => dispatch(actionCreators.getNewMatch()),
    onGetRecommendMatch: () => dispatch(actionCreators.getRecommendMatch()),
    onClickMatch: mid => dispatch(push(`/match/${mid}`)),
    onClickNlpText: query => dispatch(actionCreators.sendNlpText(query)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
