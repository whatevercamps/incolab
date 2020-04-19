import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import "../index.css";

const Banner = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) setUser(data.user);
      });
  }, []);

  return (
    <div className='Banner'>
      {!user ? (
        <div className='row'>
          <div className='col-4 login'>
            <Login />
          </div>
          <div className='col-8 title'>
            <h1>Welcome to INcolab, start innovating, creating and helping!</h1>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-12 title'>
            <h1 className='text-center'>
              Welcome to INcolab, start innovating, creating and helping!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
