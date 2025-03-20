import React from 'react';
//import '../styles/Note.css';

function Note({ title, time, onClick }) {
  return (
    <div className="note" onClick={onClick}>
      <h3>{title}</h3>
      <span className="time">{time}</span>
    </div>
  );
}

export default Note;
