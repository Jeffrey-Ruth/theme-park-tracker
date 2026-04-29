import React from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/favorites">❤️ Favorites</Link>
      <Link to="/lists">≡ Lists</Link>
      <SignedIn>
        <Link to="/settings">⚙️ Settings</Link>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="signin-btn">Sign In</button>
        </SignInButton>
      </SignedOut>
    </nav>
  );
}

export default Navbar;