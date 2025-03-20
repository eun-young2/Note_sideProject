import React from 'react';

function Header({ children }) {
  return (
    <div className="header">
      <h2>{children}</h2>
    </div>
  );
}

export default Header;
