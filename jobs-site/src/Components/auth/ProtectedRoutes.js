import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoutes({user = false}) {
    const navigate = useNavigate();
    useEffect(()=> {
        if (!user?.authenticated) {
            return navigate("/login");
        }
    },[])
    return <Outlet />;
}

export default ProtectedRoutes;
