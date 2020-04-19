import React, { useEffect, useState } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./Incolab-logo.png";

const Navbar = ({
  displayLog,
  displayReg,
  displayTeam,
  displayHome,
  getUserId,
  displaySearch,
}) => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetch("/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) setUser(data.user);
        getUserId(data.user._id);
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

  const onLogOut = () => {
    fetch("/logout")
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setUser(null);
        } else {
          alert("Error");
        }
      });
  };

  const handleSearch = (evt) => {
    const search = searchQuery.trim().split(/[\s,]+/);
    displaySearch(search);
    evt.preventDefault();
  };

  return (
    <div className='Navbar'>
      {!user ? (
        <nav className='navbar'>
          <div className='col-1 logo'>
            <a href='#'>
              <img src={logo} alt='navbar logo'></img>
            </a>
          </div>
          <div className='col-3 search' onSubmit={handleSearch}>
            <form className='form-inline my-2 my-lg-0'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
              />
            </form>
          </div>
          <div className='col-4 icons' id='icons'>
            <button onClick={displayHome} className='navbarBut'>
              <i className='active' id='home' onClick={turnActiveHome}>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </i>
            </button>
            <button onClick={displayTeam} className='navbarBut'>
              <i id='teams' onClick={turnActiveTeams}>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              </i>
            </button>
            <button className='navbarBut'>
              <i id='proyects' onClick={turnActiveProyects}>
                <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
              </i>
            </button>
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
          <div className='col-1 logo'>
            <img src={logo} alt='navbar logo'></img>
          </div>
          <div className='col-3 search'>
            <form className='form-inline my-2 my-lg-0' onSubmit={handleSearch}>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
              />
            </form>
          </div>
          <div className='col-4 icons'>
            <button className='navbarBut' onClick={displayHome}>
              <i className='active' id='home' onClick={turnActiveHome}>
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              </i>
            </button>
            <button onClick={displayTeam} className='navbarBut'>
              <i id='teams' onClick={turnActiveTeams}>
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              </i>
            </button>
            <button className='navbarBut'>
              <i id='proyects' onClick={turnActiveProyects}>
                <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
              </i>
            </button>
          </div>
          <div className='col-4 login'>
            <span>Hello {user.name}!</span>
            <button className='btn' onClick={onLogOut}>
              Logout
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
