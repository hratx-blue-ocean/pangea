import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css'

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

