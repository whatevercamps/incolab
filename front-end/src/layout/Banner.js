import React from "react";
import Login from "../components/Login";
import "../index.css";

const Banner = () => {
  return (
    <div className='Banner'>
      <div className='row'>
        <div className='col-4 login'>
          <Login />
        </div>
        <div className='col-8 title'>
          <h1>Welcome to INcolab, start innovating, creating and helping!</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
