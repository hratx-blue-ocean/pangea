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
      loggedIn: false
    };

    this.profile = this.profile.bind(this);
  }

  profile() {
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <div>
        <h1>PANGAEA</h1>
        <h6>A WORLD INTERCONNECTED THROUGH LANGUAGE</h6>

        <Login login={this.profile} />
        <Signup login={this.profile} />
        
        {this.state.loggedIn ? <Redirect to='/user' /> : null}
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