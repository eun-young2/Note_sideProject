import React from 'react';
import Note from './Note';
//import '../styles/Note.css';

function NoteList({ notes, startIndex, prev, next, onNoteClick }) {
  return (
    <>
      <div className="notes-navigation">
        <button className="arrow-btn" onClick={prev}>◀</button>
        <div className="notes-container">
          {notes.slice(startIndex, startIndex + 3).map((note, index) => (
            <Note
              key={index}
              title={note.title}
              time={note.time}
              onClick={() => onNoteClick(note)}
            />
          ))}
        </div>
        <button className="arrow-btn" onClick={next}>▶</button>
      </div>
    </>
  );
}

export default NoteList;
