import React from 'react';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
      <span className="slider"></span>
    </label>
  );
}

export default DarkModeToggle;
