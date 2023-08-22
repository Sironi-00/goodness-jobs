import React, { useState } from "react";
import Aside from "../aside.js/Aside";
import { getUserByUsername } from "../../utils/apiUsers";
import { useNavigate } from "react-router-dom";

function Login({ setCurrentUser }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "sironi",
        password: "1234",
    });

    const handleChange = ({ target }) => {
        setUser((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await getUserByUsername(user);
        if (res) {
            setCurrentUser({ ...res, authenticated: true });
            navigate("/flats");
        }
    };
    return (
        <>
            <Aside />
            <div className="scope">
                <form onSubmit={handleSubmit}>
                    <small><em>For Testing purpose Just press Login, and everything should work.</em></small>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        placeholder="Sironi"
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="P@s$Th3W0rd"
                        required
                        onChange={handleChange}
                    />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </>
    );
}

export default Login;
