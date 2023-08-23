import React, { useState } from 'react'
import Aside from '../aside.js/Aside'
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../utils/apiUsers";

function Register({setCurrentUser}) {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        group: ""
    });
    const handleSetUser = ({target}) => {
        setNewUser(prev => ({...prev, [target.name]: target.value}));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPassword) {
            alert("Password not match!");
            return
        }
        const res = await createUser(newUser);
        if (res) {
            setCurrentUser({ ...res, authenticated: true });
            navigate("/flats")
        }
    };

  return (
    <>
    <Aside />
    <div className='scope'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type='text' name="username" value={newUser.username} placeholder='Sironi' required onChange={handleSetUser}/>
        
        <label htmlFor="password">Password:</label>
        <input type='password' name="password" value={newUser.password} placeholder='P@s$Th3W0rd' minLength="5" required onChange={handleSetUser}/>
        
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type='password' name="confirmPassword" value={newUser.confirmPassword} placeholder='p@s$th3word' minLength="5" required onChange={handleSetUser}/>
        
        <label htmlFor="group">Group:</label>
        <select name="group" onChange={handleSetUser}>
            <option value="agent">Agent</option>
            <option value="employee">Employee</option>
            <option value="host">Host</option>
            <option value="admin">Admin</option>
        </select>

        <input type='submit' value="Register" />
        </form>
    </div>
    </>
  )
}

export default Register