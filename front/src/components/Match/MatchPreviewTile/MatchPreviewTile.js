// Single match tile in home page (square shape tile)
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'antd';
import './MatchPreviewTile.css';

const { Meta } = Card;

const MatchPreviewTile = props => {
  const { page, match, clickHandler } = props;

  return (
    <Card
      hoverable
      title={match.title}
      style={{ width: 240 }}
      cover={
        <div className="Tile-Cover">
          <img alt="noPic" src={match.matchThumbnail} />
        </div>
      }
      onClick={clickHandler}
    >
      <p>Host: {match.hostUser.username}</p>
      <p>Location: {match.locationText}</p>
      <p>Begin: {moment(match.timeBegin).format('YYYY/MM/DD, h:mm a')}</p>
      <p>End: {moment(match.timeEnd).format('YYYY/MM/DD, h:mm a')}</p>
      <p>Participants: {match.numParticipants}</p>
      <p>Capacity: {match.capacity}</p>
      <Meta className={`${page}MatchPreviewTile ${match.id}`} />
    </Card>
  );
};
MatchPreviewTile.propTypes = {
  page: PropTypes.string.isRequired,
  match: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    hostUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    locationText: PropTypes.string.isRequired,
    timeBegin: PropTypes.string.isRequired,
    timeEnd: PropTypes.string.isRequired,
    numParticipants: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    matchThumbnail: PropTypes.string,
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
};
MatchPreviewTile.defaultProps = {};
export default MatchPreviewTile;
