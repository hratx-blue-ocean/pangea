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
          <ul className="navbar-list">
<<<<<<< HEAD
            <li className="navbar-item">   
                <Link to={{ pathname: "/penpals", state: {userData} }} >My Pen Pals</Link>
=======
            <li className="navbar-item">
              <Link to="/penpals" className="navbar-link">My Pen Pals</Link>
>>>>>>> 892f200f6f10a86ec26dc7e06b60289bd945b1ee
            </li>
            <li className="navbar-item">
              <Link to="/chat" className="navbar-link">Chat</Link>
            </li>
          </ul>
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
