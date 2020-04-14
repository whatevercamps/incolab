import React from "react";
import "../index.css";

/*Mariana Rodriguez: When there's an error while registering, the user receives a JSON from the API. This error should be caught
by the  view and shown in an alert. */
const Register = () => (
  <div className='Register'>
    <div className='container'>
      <form action='/register' method='post' className='registerForm'>
        <h2 className='text-center'>Sign up</h2>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            id='exampleInputEmail1'
            placeholder='Enter name'
          />
        </div>
        <div className='form-group'>
          <label>Email address</label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
          />
        </div>
        <div className='form-group text-center'>
          <p>
            Already have an account?, <button className='logBut'>Log in</button>
          </p>
        </div>
        <div className='but'>
          <button type='submit' className='btn btn-primary' value='Submit'>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Register;
