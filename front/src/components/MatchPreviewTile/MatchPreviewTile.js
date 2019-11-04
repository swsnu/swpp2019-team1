// Single match tile in home page (square shape tile)
import React from 'react';
import PropTypes from 'prop-types';

const MatchPreviewTile = props => {
  const {
    prefix,
    title,
    host,
    location,
    time,
    numOfParticipants,
    capacity,
    clickHandler,
  } = props;
  return (
    <button
      type="button"
      id={`${prefix}MatchPreviewTile`}
      onClick={clickHandler}
    >
      MatchPreviewTile
      <div className="title">{`Title: ${title}`}</div>
      <div className="host">{`Host: ${host}`}</div>
      <div className="location">{`Location: ${location}`}</div>
      <div className="time">{`Time: ${time}`}</div>
      <div className="numParticipants">{`Participants: ${numOfParticipants}`}</div>
      <div className="capacity">{`Capacity: ${capacity}`}</div>
    </button>
  );
};
MatchPreviewTile.propTypes = {
  prefix: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.number).isRequired,
  time: PropTypes.arrayOf(PropTypes.number).isRequired,
  numOfParticipants: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
export default MatchPreviewTile;
