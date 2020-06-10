import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signup: false,
      loggedIn: false,
      userData: {}
    };

    this.profile = this.profile.bind(this);
  }

  profile(userData) {
    this.setState({
      loggedIn: true,
      userData: userData
    });
  }

  render() {
    return (
      <div>
        <h1>PANGAEA</h1>
        <h6>A WORLD INTERCONNECTED THROUGH LANGUAGE</h6>

        <Login login={this.profile} />
        <Signup login={this.profile} />
        
        {this.state.loggedIn ? <Redirect to={{ pathname: '/user', state: {userData: this.state.userData} }} /> : null}
      </div>
    )
  }
}

/*
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}*/