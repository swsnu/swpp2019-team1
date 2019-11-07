// Single match tile in home page (square shape tile)
import React from 'react';
import PropTypes from 'prop-types';

const MatchPreviewTile = props => {
  const {
    page,
    title,
    host,
    location,
    time,
    numParticipants,
    capacity,
    clickHandler,
  } = props;
  return (
    <button type="button" id={`${page}MatchPreviewTile`} onClick={clickHandler}>
      MatchPreviewTile
      <div className="title">{`Title: ${title}`}</div>
      <div className="host">{`Host: ${host}`}</div>
      <div className="location">{`Location: ${location}`}</div>
      <div className="time">{`Time: ${time}`}</div>
      <div className="numParticipants">{`Participants: ${numParticipants}`}</div>
      <div className="capacity">{`Capacity: ${capacity}`}</div>
    </button>
  );
};
MatchPreviewTile.propTypes = {
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  time: PropTypes.string,
  numParticipants: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
export default MatchPreviewTile;
