import "./Nav.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Nav({currentUser = "Guest"}) {
    return (
        <header>
            <div className="avatar">
            <h1>Goodness Jobs</h1>
                <p>&gt;{currentUser.username}&lt;</p>
            </div>
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
