import React, { useState } from 'react';

import Calendar from './Calendar';
//the props come from home login, react router redirect. here userData is state passed from props
const Profile = props => {
  const [userData] = useState(props.location.state.userData)
  
  return (
    <div>
      <Calendar userId={userData._id} events={userData.events}/>
    </div>
  )
}

export default Profile;

/*
 /api/findUser queries by username
/api/createUser recieves req.body
 */