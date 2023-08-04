import './Nav.css'
import React from "react";
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <h1>Goodness Jobs</h1>
      <nav>
        <ul>
        <li>
          <NavLink className="nav-link" to="/">Home</NavLink></li>
          <li><NavLink className="nav-link" to="/flats">Flats</NavLink></li>
          <li><NavLink className="nav-link" to="/jobs">Jobs</NavLink></li>
          <li><NavLink className="nav-link" to="/cleaned">Cleaned</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
