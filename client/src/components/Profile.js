import React from 'react';

import Calendar from './Calendar';

const Profile = props => {
  return (
    <div>
      <Calendar />
    </div>
  )
}

export default Profile;

/*
 /api/findUser queries by username
/api/createUser recieves req.body
 */