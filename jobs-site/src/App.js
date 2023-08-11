import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Components/nav/Nav";
import Home from "./Components/home/Home";
import Flats from "./Components/flats/Flats";
import NewFlat from "./Components/flats/NewFlat";
import Jobs from "./Components/jobs/Jobs";
import Job from "./Components/jobs/Job";
import NewJob from "./Components/jobs/NewJob";
import Cleaned from "./Components/cleaned/Cleaned";

import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({username: "", id: ""});
  
  return (
    <>
      <BrowserRouter>
        <Nav currentUser={currentUser} />
        <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
          <Route path="/flats/new" element={<NewFlat />} />
          <Route path="/flats/:code" element={<Jobs />} />
          <Route path="/flats" element={<Flats />} />
          <Route path="/jobs/new" element={<NewJob />} />
          <Route path="/jobs/:recordId" element={<Job />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/cleaned" element={<Cleaned />} />
          <Route path="*" element={<h1>Feature Coming soon</h1>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
