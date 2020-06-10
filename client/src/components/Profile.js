import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
//import Login from './Components/Login';
import PenPals from './PenPals';
import Chat from './Chat';


const Profile = (props) => {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
                <Link to="/penpals" className="navbar-link">My Pen Pals</Link>
            </li>
            <li className="navbar-item">
                <Link to="/chat" className="navbar-link">Chat</Link>
            </li>
          </ul>
        </nav>
        {/* <Route path="/" exact component={Login}/>  */}
        <Route path="/penpals" component={PenPals}/>
        <Route path="/chat" component={Chat}/>
      </Router>
    </div>
  )
}

export default Profile;

/*
 /api/findUser queries by username
/api/createUser recieves req.body
 */