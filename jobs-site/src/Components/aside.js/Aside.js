import './aside.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Aside({ array = [] }) {
  const navigate = useNavigate();
  return (
    <div className="aside">
      <h2>Features:</h2>
      <ul className="features">
        {array.map((obj) => {
          return (
            <li key={obj.name}>
              <input type="button" value={obj.name} onClick={() => obj.asideClickHandler()} />
            </li>
          );
        })}
      </ul>
      <ul className="system-links">
        <li>
          <Link to="/settings">Settings</Link>{" "}
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/logout"> Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Aside;
