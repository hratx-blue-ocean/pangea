import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import './Home.css'

import Login from './Login';
import Signup from './Signup';
// possibly make the loggedin & login state more specific to its use
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
      <div id='landing'>
        <h1>PANGAEA</h1>
        <h6>A WORLD INTERCONNECTED THROUGH LANGUAGE</h6>
        
        <div id='buttons'> 
          <Login login={this.profile} id='login' />
          <Signup login={this.profile} id='signup' />
        </div>
        {this.state.loggedIn ? <Redirect to={{ pathname: '/user', state: {userData: this.state.userData} }} /> : null}
      </div>
    )
  }
}

/*

Used for going backward through history SOURCE: React Router Docs
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