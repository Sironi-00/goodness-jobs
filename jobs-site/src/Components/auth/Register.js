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
    const setName = ({target}) => {
        setNewUser(prev => ({...prev, username: target.value}));
    };
    const setPassword = ({target}) => {
        setNewUser(prev => ({...prev, password: target.value}));
    };
    const setConfirmPassword = ({target}) => {
        setNewUser(prev => ({...prev, confirmPassword: target.value}));
    };
    const setGroup = ({target}) => {
        setNewUser(prev => ({...prev, group: target.value}));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPassword) {
            alert("Password not match!");
            return
        }
        const res = await createUser(newUser);
        if (res) {
            setCurrentUser(res);
            navigate("/flats")
        }
    };

  return (
    <>
    <Aside />
    <div className='scope'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name:</label>
        <input type='text' value={newUser.username} placeholder='Sironi' required onChange={setName}/>
        <label htmlFor="password">Password:</label>
        <input type='password' value={newUser.password} placeholder='P@s$Th3W0rd' required onChange={setPassword}/>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type='password' value={newUser.confirmPassword} placeholder='p@s$th3word' required onChange={setConfirmPassword}/>
        <label htmlFor="group">Group:</label>
        <select onChange={setGroup}>
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