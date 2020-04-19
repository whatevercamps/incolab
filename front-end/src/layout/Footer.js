import React from "react";
import logo from "./Incolab-logo.png";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
            <img src={logo} alt='navbar logo'></img>
          </div>
          <div className='col-4 follow'>
            <h3>Follow Us!</h3>
            <span>
              <i>
                {" "}
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </i>
            </span>
            <span>
              <i>
                {" "}
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </i>
            </span>
            <span>
              <i>
                {" "}
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
