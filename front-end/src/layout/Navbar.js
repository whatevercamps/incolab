import React, { useEffect, useState } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./Incolab-logo.png";

const Navbar = ({ displayLog, displayReg, displayTeam, displayHome }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) setUser(data.user);
      });
  }, []);

  const turnActiveTeams = () => {
    document.getElementById("teams").className = "active";
    document.getElementById("home").className = "";
    document.getElementById("proyects").className = "";
    document.title = "Incolab - Teams";
  };

  const turnActiveHome = () => {
    document.getElementById("teams").className = "";
    document.getElementById("home").className = "active";
    document.getElementById("proyects").className = "";
    document.title = "Incolab - Home";
  };

  const turnActiveProyects = () => {
    document.getElementById("teams").className = "";
    document.getElementById("home").className = "";
    document.getElementById("proyects").className = "active";
    document.title = "Incolab - Proyects";
  };

  return (
    <div className='Navbar'>
      {!user ? (
        <nav className='navbar'>
          <div className='col-1 logo'>
            <img src={logo}></img>
          </div>
          <div className='col-3 search'>
            <form className='form-inline my-2 my-lg-0'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
            </form>
          </div>
          <div className='col-4 icons' id='icons'>
            <a onClick={displayHome}>
              <i className='active' id='home' onClick={turnActiveHome}>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </i>
            </a>
            <a onClick={displayTeam}>
              <i id='teams' onClick={turnActiveTeams}>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              </i>
            </a>
            <a>
              <i id='proyects' onClick={turnActiveProyects}>
                <FontAwesomeIcon icon={faProjectDiagram}></FontAwesomeIcon>
              </i>
            </a>
          </div>
          <div className='col-4 login'>
            <button className='signInBut' onClick={displayLog}>
              Sign in
            </button>
            <button className='btn' onClick={displayReg}>
              Sign up
            </button>
          </div>
        </nav>
      ) : (
        <nav className='navbar'>
          <div className='col-4 search'>
            <form className='form-inline my-2 my-lg-0'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
            </form>
          </div>
          <div className='col-4 icons'>
            <a href='/'>
              <i className='active'>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </i>
            </a>
            <a onClick={displayTeam}>
              <i>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              </i>
            </a>
            <a href='/'>
              <i>
                <FontAwesomeIcon icon={faProjectDiagram}></FontAwesomeIcon>
              </i>
            </a>
          </div>
          <div className='col-4 login'>
            <span>Hello {user.name}</span>
            <button className='btn'>Logout</button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
