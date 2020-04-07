import React, { Component } from 'react';

const Login = ({ verification }) => {
  return (
    <div className='modal' id='login'>
      <div className='login-header'>
        <div className='image-frame'>
          <img className='logo' src={'../assets/logo.png'} />
        </div>
        <h1>Dinder Login</h1>
      </div>
      <form onSubmit={verification}>
        <div>
          <label for='user'>Username:</label>
          <input type='text' name='username' id='user' />
        </div>
        <div>
          <label for='password'>Password:</label>
          <input type='password' name='password' id='password' />
        </div>
        <button className='sign-in' name=' button' id='button' type='submit'>
          <i className='fa fa-sign-in-alt'></i>
        </button>
      </form>
    </div>
  );
};
export default Login;
