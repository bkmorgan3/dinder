import React, { Component } from 'react';

export default class Authfrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        FORM
      </div>
    )
  }
}