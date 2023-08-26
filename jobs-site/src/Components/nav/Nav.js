import "./Nav.css";
import React from "react";
import { NavLink, Link } from "react-router-dom";

function Nav({ currentUser = {} }) {
    return (
        <header>
            <div className="avatar">
                <h1>Goodness Jobs</h1>
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
            {currentUser?.authenticated ? (
                <div className="avatar">
                    <div id="user-profile">
                        <img id="profile-img" src="" alt="⚠️" />
                    </div>
                    <div className="user-menu">
                        <p>{currentUser.username}</p>
                        <Link className="global-links" to="/logout">
                            Logout
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Link className="global-links" to="/login">
                        
                        Login
                    </Link>
                    <Link className="global-links" to="/register">
                        Register
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Nav;
