import React, { useEffect, useState } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ displayLog, displayReg, displayTeam, displayHome }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/users/profile")
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  return (
    <div className='Navbar'>
      {!user ? (
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
            <a onClick={displayHome}>
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
            <p>Hello {user.name}</p>
            <button className='btn'>Logout</button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
