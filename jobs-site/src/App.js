import { useState } from "react";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";

import Nav from "./Components/nav/Nav";
import Home from "./Components/home/Home";
import Flats from "./Components/flats/Flats";
import NewFlat from "./Components/flats/NewFlat";
import Jobs from "./Components/jobs/Jobs";
import Job from "./Components/jobs/Job";
import NewJob from "./Components/jobs/NewJob";
import Cleaned from "./Components/cleaned/Cleaned";

import Login from "./Components/auth/Login";
import Logout from "./Components/auth/Logout.js";
import Register from "./Components/auth/Register";
import ProtectedRoutes from "./Components/auth/ProtectedRoutes";
import { getSessionUser, setSessionUser } from "./utils/session";

function App() {
  const [currentUser, setCurrentUser] = useState(getSessionUser());
  
  const userSession = (user) => {
    // ⚠️
    setCurrentUser(setSessionUser(user));
  }
  return (
    <>
      <BrowserRouter>
        <Nav currentUser={currentUser} />
        <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setCurrentUser={userSession} />} />
          <Route path="/logout" element={<Logout setCurrentUser={userSession} />} />
          <Route path="/register" element={<Register setCurrentUser={userSession} />} />
          
          <Route element={<ProtectedRoutes user={currentUser} setCurrentUser={userSession} />}> 
            <Route path="/flats/new" element={<NewFlat />} />
            <Route path="/flats/:code" element={<Jobs />} />
            <Route path="/flats" element={<Flats />}/>
            <Route path="/jobs/new" element={<NewJob />} />
            <Route path="/jobs/:recordId" element={<Job />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/cleaned" element={<Cleaned />} />
          </Route>
          
          <Route path="*" element={<h1>Feature Coming soon</h1>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
