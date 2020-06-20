import React, { Component } from 'react';
const logo = require("../assets/logo.png")
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log("e", e.target.name, e.target.value)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }


  render() {
    const { username, password, email } = this.state;
    const { submit } = this.props;
    return (
      <div className='modal' id='login' >
        <div className='login-header'>
          <div className='image-frame'>
            <img className='logo' src={logo} />
          </div>
          <h1>Dinder Login</h1>
        </div>
        <form onSubmit={submit} >
          <div>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username' id='username' value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' id='password' value={password} onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' id='email' value={email} onChange={this.handleChange} />
          </div>
          <h3>Returning user?<Link to="/login">Log In</Link></h3>
          <button className='sign-in' name=' button' id='button' type='submit'>
            <i className='fa fa-sign-in-alt'></i>
          </button>
        </form>
      </div >
    );
  }
};
export default Signup;

