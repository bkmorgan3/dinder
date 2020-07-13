import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = ({ showFavs }) => (
  // <div className="nav-buttons">
  //   <button onClick={showFavs}>Show Favs</button>
  //   <button>Logout</button>
  // </div>

  <nav>
    <div className="nav-container">
      <div className="nav-header">
        {/* <Link to="/" >
          <img src={Logo} alt="Go Home" />
        </Link> */}
        Nav
      </div>
    </div>
  </nav>
);

export default Navbar;
