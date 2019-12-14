// Single match tile in home page (square shape tile)
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'antd';

import { getCategoryFirstName } from '../../../store/staticData/categories';

import './MatchPreviewTile.css';

const { Meta } = Card;

const MatchPreviewTile = props => {
  const { page, match, clickHandler } = props;
  const indexes = JSON.parse(match.category.indexes);
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
      <p>
        <span className="type">Host </span>
        <span>{match.hostUser.username}</span>
        <span className="capacity end">
          &nbsp;{match.numParticipants}/{match.capacity}
        </span>
      </p>
      <p>
        <span className="type">Category </span>
        <span>{getCategoryFirstName(indexes)}</span>
      </p>
      <p>
        <span className="type">Location </span>
        <span>{match.locationText}</span>
        <p>
          <span className="type">Time </span>
          <span>{moment(match.timeBegin).format('YY/MM/DD, h:mm a')}</span>
          <br />
          <span className="timeEnd">
            ~&nbsp;{moment(match.timeEnd).format('YY/MM/DD, h:mm a')}
          </span>
        </p>
      </p>

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
    category: PropTypes.shape({ indexes: PropTypes.string }),
  }).isRequired,
  clickHandler: PropTypes.func.isRequired,
};
MatchPreviewTile.defaultProps = {};
export default MatchPreviewTile;
