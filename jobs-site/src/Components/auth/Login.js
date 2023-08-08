import React, { useState } from 'react'
import Aside from '../aside.js/Aside'
import { getUserByUsername } from '../../utils/apiUsers';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const setUsername = ({target}) => {
    setUser(prev => ({...prev, username: target.value}));
};
const setPassword = ({target}) => {
    setUser(prev => ({...prev, password: target.value}));
};
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    return ;
    const res = await getUserByUsername(user);
    if (res) {
        navigate("/flats")
    }
}
    return (
    <>
    <Aside />
    <div className='scope'>
    <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username:</label>
        <input type='text' value={user.username} placeholder='Sironi' required onChange={setUsername}/>
        <label htmlFor="password">Password:</label>
        <input type='password' value={user.password} placeholder='P@s$Th3W0rd' required onChange={setPassword}/>
        <input type='submit' value="Login" />
    </form>
    </div>
    </>
  )
}

export default Login