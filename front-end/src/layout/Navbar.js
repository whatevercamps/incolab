import React from 'react';
import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faProjectDiagram }from '@fortawesome/free-solid-svg-icons'

const Navbar = () => (
  <div className="Navbar">
    <nav className="navbar">
      <div className="col-4 search">
      <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
      </div>
      <div className="col-4 icons">
        <a href="/"><i className="active"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></i></a> 
        <a href="/"><i><FontAwesomeIcon icon={faUsers} ></FontAwesomeIcon></i></a>
        <a href="/"><i><FontAwesomeIcon icon={faProjectDiagram} ></FontAwesomeIcon></i></a> 
      </div>
      <div className="col-4 login">
        <a href="/">Sign in</a>
        <button className="btn">Sign up</button>
      </div>
    </nav>  
  </div>
);

export default Navbar;