import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import "./index.css";

function App() {
  const [clickLog, setClickLog] = useState(false);
  const [clickReg, setClickReg] = useState(false);
  const [clickTeam, setClickTeam] = useState(false);

  const displayLogin = () => {
    setClickLog(true);
    setClickReg(false);
    setClickTeam(false);
  };

  const displayRegister = () => {
    setClickReg(true);
    setClickTeam(false);
    setClickLog(false);
  };

  const displayTeams = () => {
    setClickTeam(true);
    setClickLog(false);
    setClickReg(false);
  };

  return (
    <div>
      <Navbar
        displayLog={displayLogin}
        displayReg={displayRegister}
        displayTeam={displayTeams}
      />
      {clickLog === true && <Login />}
      {clickReg === true && <Register />}
      {clickTeam === true && <Teams />}
    </div>
  );
}

export default App;
