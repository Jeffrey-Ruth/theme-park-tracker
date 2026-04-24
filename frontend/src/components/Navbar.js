import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/favorites">❤️ Favorites</Link>
      <Link to="/lists">≡ Lists</Link>
      <Link to="/profile">👤 Profile</Link>
    </nav>
  );
}

export default Navbar;