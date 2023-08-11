import './Aside.css';
import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../../utils/apiUsers';

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
          <Link className='global-links' to="/settings">Settings</Link>{" "}
        </li>
        <li>
          <Link className='global-links' to="/help">Help</Link>
        </li>
        <li>
          <Link className='global-links' to="/login"> Login</Link>
        </li>
        <li>
          <Link className='global-links' to="/register"> Register</Link>
        </li>
        <li>
          <Link className='global-links' to="/" onClick={()=> logout()}> Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Aside;
