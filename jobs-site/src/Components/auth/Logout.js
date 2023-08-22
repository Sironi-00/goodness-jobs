import { logout } from '../../utils/apiUsers';
import { useNavigate,  } from 'react-router-dom';
import React, { useEffect } from 'react';

function Logout({setCurrentUser}) {
    const navigate = useNavigate()
    const handleLogout =  async () => {
        setCurrentUser(null);
        const res = await logout();
        if (res) {
            navigate("/");
        }
    }
    useEffect(()=>{handleLogout()},[])
    return <h1>Logging Out</h1>;
}

export default Logout