import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import Home from "./components/Home";
import Search from "./components/Search";
import "./index.css";

function App() {
  const [userId, setUserId] = useState(null);

  const [clickHome, setClickHome] = useState(true);
  const [clickLog, setClickLog] = useState(false);
  const [clickReg, setClickReg] = useState(false);
  const [clickTeam, setClickTeam] = useState(false);
  const [clickSearch, setClickSearch] = useState(false);
  const [search, setSearch] = useState([]);

  const displayHome = () => {
    setClickHome(true);
    setClickLog(false);
    setClickReg(false);
    setClickTeam(false);
    setClickSearch(false);
  };
  const displayLogin = () => {
    setClickHome(false);
    setClickLog(true);
    setClickReg(false);
    setClickTeam(false);
    setClickSearch(false);
  };

  const displayRegister = () => {
    setClickHome(false);
    setClickReg(true);
    setClickTeam(false);
    setClickLog(false);
    setClickSearch(false);
  };

  const displayTeams = () => {
    setClickHome(false);
    setClickTeam(true);
    setClickLog(false);
    setClickReg(false);
    setClickSearch(false);
  };

  const getUserId = (id) => {
    setUserId(id);
  };

  const displaySearch = (search) => {
    console.log("cambiando search", search);
    setSearch(search);
    setClickHome(false);
    setClickTeam(false);
    setClickLog(false);
    setClickReg(false);
    setClickSearch(true);
  };

  return (
    <div>
      <Navbar
        displayHome={displayHome}
        displayLog={displayLogin}
        displayReg={displayRegister}
        displayTeam={displayTeams}
        getUserId={getUserId}
        displaySearch={displaySearch}
      />
      {clickHome === true && <Home />}
      {clickLog === true && <Login />}
      {clickReg === true && <Register />}
      {clickTeam === true && <Teams userId={userId} />}
      {clickSearch === true && <Search search={search} />}
    </div>
  );
}

export default App;
