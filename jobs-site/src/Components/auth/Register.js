import React, { useState } from 'react'
import Aside from '../aside.js/Aside'
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../utils/apiUsers";

function Register() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        group: ""
    });
    const setUsername = ({target}) => {
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
        console.log(newUser);
        return;
        const res = await createUser({newUser});
        if (res) {
            navigate("/flats")
        }
    };

  return (
    <>
    <Aside />
    <div className='scope'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type='text' value={newUser.username} placeholder='Sironi' required onChange={setUsername}/>
        <label htmlFor="password">Password:</label>
        <input type='password' value={newUser.password} placeholder='P@s$Th3W0rd' required onChange={setPassword}/>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type='password' value={newUser.confirmPassword} placeholder='p@s$th3word' required onChange={setConfirmPassword}/>
        <label htmlFor="group">Group:</label>
        <select onChange={setGroup} value={newUser.group}>
        <option value="">Default</option>
            <option value="fac">Fac</option>
            <option value="gc">GC</option>
            <option value="admin">Admin</option>
        </select>
        <input type='submit' value="Register" />
        </form>
    </div>
    </>
  )
}

export default Register