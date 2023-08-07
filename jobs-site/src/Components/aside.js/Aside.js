import './Aside.css';
import React from "react";
import { Link } from "react-router-dom";

function Aside({ array = [] }) {
    return (
    <div className="aside">
      
      <ul className="features">
        {array.map((btnObj) => {
          return (
            <li key={btnObj.name}>
              <input type="button" value={btnObj.name} onClick={()=> btnObj.asideClickHandler()} />
            </li>
          );
        })}
      </ul>
      <ul className="sys-links">
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
