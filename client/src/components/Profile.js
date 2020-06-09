import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Profile = props => {
  
  const {  username, location, langFluent, langInterested } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../../public/profile_files/profile.png/100px180" />
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Text>
          Location: {location}
        </Card.Text>
        <Card.Text>
          You are fluent in {langFluent} and would like to learn {langInterested}.
        </Card.Text>
        <Button variant="primary">Start Chatting</Button>
      </Card.Body>
    </Card>
  )
}


export default Profile;