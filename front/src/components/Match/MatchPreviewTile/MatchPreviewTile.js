// Single match tile in home page (square shape tile)
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'antd';

import { getCategoryName } from '../../../store/staticData/categories';

import './MatchPreviewTile.css';

const { Meta } = Card;

const MatchPreviewTile = props => {
  const { page, match, clickHandler } = props;
  const indexes = JSON.parse(match.category.indexes);
  const categoryName = getCategoryName(indexes.slice(0, 1));
  return (
    <div className="MatchPreviewTile">
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
        <span className="type category">{categoryName}</span>
        <p className="top-margin">
          <span className="type">Host </span>
          <span>{match.hostUser.username}</span>
          <span className="capacity end">
            &nbsp;{match.numParticipants}/{match.capacity}
          </span>
        </p>
        <p>
          <span className="type">Time </span>
          <span>{moment(match.timeBegin).format('YY/MM/DD, h:mm a')}</span>
          <br />
          <span className="timeEnd">
            ~&nbsp;{moment(match.timeEnd).format('YY/MM/DD, h:mm a')}
          </span>
        </p>
        <br />
        <p className="bottom-inverse-margin">
          <span className="location">
            <span className="type">Location </span>
            {match.locationText}
          </span>
        </p>
        <Meta className={`${page}MatchPreviewTile ${match.id}`} />
      </Card>
    </div>
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
