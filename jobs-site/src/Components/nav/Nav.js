import "./Nav.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <header>
            <h1>Goodness Jobs</h1>
            <nav>
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/flats">
                    Flats
                </NavLink>
                <NavLink className="nav-link" to="/jobs">
                    Jobs
                </NavLink>
                <NavLink className="nav-link" to="/cleaned">
                    Cleaned
                </NavLink>
            </nav>
        </header>
    );
}

export default Nav;
