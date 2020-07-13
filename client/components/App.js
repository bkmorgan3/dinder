

import React, { Component } from 'react';
import Navbar from './Navbar.js';
import MainContainer from './MainContainer.js';
import axios from 'axios';
import key from '../../config/keys';
import Login from './Loginpage.js';
import Signup from './SignupPage'
import Homepage from './Homepage.js';
import Authform from './Authform';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

const locationSearched = '1600 Main St 1st floor, Venice, CA 90291';

class App extends Component {
  constructor() {
    super();
    this.state = {
      businessList: [],
      currentIndex: 0,
      favs: [],
      visited: {},
      fetchingDetails: false,
      isSidebarOpen: false,
      currentUser: '',
      verified: false,
      dance: false,
      play: false
    };

    this.showFavs = this.showFavs.bind(this);
    this.verify = this.verify.bind(this);
    this.submit = this.submit.bind(this);
  }
  verify(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    axios
      .post('/api/auth/login', { username, password })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token)
          this.setState({ verified: true, currentUser: res.data.username })
        }
      })
      .catch(err => console.error(err));
  }

  submit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    axios.post("/api/auth/signup", { username, password, email })
      .then(res => {
        console.log(res.data)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token)
          this.setState({ verified: true, currentUser: res.data.username })
        }
      })
  }

  showFavs() {
    console.log('showFavs is clicked');
  }

  render() {
    const { verified, currentUser } = this.state;

    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/login"
              render={props =>
                !verified ? (
                  <Login {...props} verification={this.verify} />
                ) : (<Redirect to="/homepage" />)
              }
            />
            <Route
              path="/signup"
              render={props =>
                !verified ? (
                  <Signup {...props} submit={this.submit} />
                ) : (<Redirect to="/homepage" />
                  )
              }
            />
            <Route
              path="/homepage"
              render={props =>
                verified ? (
                  <MainContainer {...props} currentUser={currentUser} />
                ) : (
                    <Redirect to="/login" />
                  )}
            />
            <Route
              exact
              path="/"
              render={props =>
                !verified ? (
                  <Login {...props} verification={this.verify} />
                ) : (
                    <Redirect to="/homepage" />
                  )} />
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;