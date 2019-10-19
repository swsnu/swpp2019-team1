import React from 'react';

const MatchForm = props => {
  return (
    <div className="MatchForm">
      <h1>Create Activity</h1>
      Title <input type="text" />
      <br />
      Category <input type="text" /> Up to <input type="number" /> people
      <br />
      Location <input type="text" /> Online <input type="checkbox" />
      Event Start
      <br />
      Date <input type="date" /> Time <input type="time" />  Periodic <input type="checkbox" />
      Event Finish
      <br />
      Date <input type="date" /> Time <input type="time" />  Up to <input type="number" /> days
      <br />
      Additional Information <input type="text" />
      <br />
      Restriction
      Age <input type="checkbox" /> From <input type="number" /> To <input type="number" /> Age <input type="checkbox" /> <input type="button" value='M' /> <input type="button" value='F' />
    </div>
  );
};
export default MatchForm;