import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import Home from "./components/Home";
import "./index.css";

function App() {
  const [clickHome, setClickHome] = useState(true);
  const [clickLog, setClickLog] = useState(false);
  const [clickReg, setClickReg] = useState(false);
  const [clickTeam, setClickTeam] = useState(false);

  const displayHome = () => {
    setClickHome(true);
    setClickLog(false);
    setClickReg(false);
    setClickTeam(false);
  };
  const displayLogin = () => {
    setClickHome(false);
    setClickLog(true);
    setClickReg(false);
    setClickTeam(false);
  };

  const displayRegister = () => {
    setClickHome(false);
    setClickReg(true);
    setClickTeam(false);
    setClickLog(false);
  };

  const displayTeams = () => {
    setClickHome(false);
    setClickTeam(true);
    setClickLog(false);
    setClickReg(false);
  };

  return (
    <div>
      <Navbar
        displayHome={displayHome}
        displayLog={displayLogin}
        displayReg={displayRegister}
        displayTeam={displayTeams}
      />
      {clickHome === true && <Home />}
      {clickLog === true && <Login />}
      {clickReg === true && <Register />}
      {clickTeam === true && <Teams />}
    </div>
  );
}

export default App;
