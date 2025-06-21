import React from 'react';
import '../style/Header.css';

export default function Header() {
  return (
    <header className="global-header">
      <div className="header-left">
        <img src="/cigarette.png" alt="Cigarette Icon" className="header-icon" />
        <span className="header-title">pushPauza</span>
      </div>
    </header>
  );
}
