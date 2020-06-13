import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Calendar from './Calendar';
import PenPals from './PenPals';
import Chat from './Chat';

import './Profile.css';


//the props come from home login, react router redirect. here userData is state passed from props
const Profile = props => {
  const [userData] = useState(props.location.state.userData)
  
  return (
    <div>
      <Router>
        <nav className="navbar">
        <a className="navbar-brand"><img src="pangaea.png" className="logo"></img></a>
          <ul className="navbar-list">
          <li className="navbar-item">
                <Link to={{ pathname: "/"}} className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to={{ pathname: "/penpals", state: {userData} }} className="navbar-link" >My Pen Pals</Link>
            </li>
            <li className="navbar-item">
                <Link to={{ pathname: "/chat", state: {userData} }} className="navbar-link">Chat</Link>
            </li>
          </ul>
          <a className="navbar-logout" href="/"><i className="logout fa fa-sign-out"></i></a>
        </nav>
        <Route path="/penpals" component={PenPals}/>
        <Route path="/chat" component={Chat}/>
      </Router>
      <Calendar userId={userData._id} events={userData.events}/>
    </div>
  )
}

export default Profile;

/*
 /api/findUser queries by username
/api/createUser recieves req.body
 */
