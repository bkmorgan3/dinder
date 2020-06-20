import React, { Component } from 'react';
const logo = require("../assets/logo.png")
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  render() {
    const { username, password } = this.state;
    const { verification } = this.props;

    return (
      <div className='modal' id='login' >
        <div className='login-header'>
          <div className='image-frame'>
            <img className='logo' src={logo} />
          </div>
          <h1>Dinder Login</h1>
        </div>
        <form onSubmit={verification}>
          <div>
            <label htmlFor='user'>Username:</label>
            <input type='text' name='username' id='user' value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' id='password' value={password} onChange={this.handleChange} />
          </div>
          <h3>First time here?<Link to="/signup">Sign Up!</Link></h3>
          <button className='sign-in' name=' button' id='button' type='submit'>
            <i className='fa fa-sign-in-alt'></i>
          </button>
        </form>
      </div >
    );
  }
}
export default Login;

