import React, { Component } from 'react';
// import './App.css';

import Login from './components/Login';
import Signup from './components/Signup';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signup: false
    };
    //this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {
    // fetch(this.api)
    //   .then(res => res.json())
    //   .then(seaCreatures => {
    //     this.setState({ seaCreatures: seaCreatures.data });
    //   });
  }

  render() {
    return (
      <div>
        <h1>PANGAEA</h1>
        <h6>A WORLD INTERCONNECTED THROUGH LANGUAGE</h6>

        <Login />
        <Signup />
      </div>
    );
  }
}
