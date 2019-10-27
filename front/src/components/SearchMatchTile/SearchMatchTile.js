// Single match tile in search page (square shape tile)
// If this tile is identical with HomeMatchTile, delete this file.

import React from 'react';
import PropTypes from 'prop-types';

const HomeMatchTile = props => {
  const {
    title,
    host,
    location,
    time,
    numOfParticipants,
    capacity,
    clickHandler,
  } = props;
  return (
    <button type="button" id="SearchMatchTile" onClick={clickHandler}>
      HomeMatchTile
      <div className="title">{`Title: ${title}`}</div>
      <div className="host">{`Host: ${host}`}</div>
      <div className="location">{`Location: ${location}`}</div>
      <div className="time">{`Time: ${time}`}</div>
      <div className="numParticipants">{`Participants: ${numOfParticipants}`}</div>
      <div className="capacity">{`Capacity: ${capacity}`}</div>
    </button>
  );
};
HomeMatchTile.propTypes = {
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.number).isRequired,
  time: PropTypes.arrayOf(PropTypes.number).isRequired,
  numOfParticipants: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
export default HomeMatchTile;
