import React, {useState} from 'react';
// import '../UserSearch.css'
import UserCard from './UserCard';

const UserSearch = props => {
  const [users, setUsers] = useState({name: "Fred Jinkins",
language: "French"})
  return (
    <div>
      yeet
      <UserCard users={users}/>
    </div>
  )
}

export default UserSearch;