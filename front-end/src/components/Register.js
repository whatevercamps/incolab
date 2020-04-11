import React from "react";
import "../index.css";

const Register = () => (
  <div className='Register'>
    <div className='container'>
      <form action='/users/register' method='post' className='registerForm'>
        <h2 className='text-center'>Sign up</h2>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Name</label>
          <input
            type='text'
            class='form-control'
            id='exampleInputEmail1'
            placeholder='Enter name'
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
          />
        </div>
        <div className='form-group text-center'>
          <p>
            Already have an account?, <a href='#'>Log in</a>
          </p>
        </div>
        <div className='but'>
          <button type='submit' className='btn btn-primary'>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Register;
