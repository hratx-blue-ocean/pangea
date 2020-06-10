import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
 moment().format();

const CalEvent = props => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [user, setUser] = useState('');
  

  const handleClose = () => {
    props.close();
  };

  const handleSubmit = () => {
    const event = {
      title,
      start: `${props.date}T${time}:00`,
      allDay: false,
      user
    }

    props.addEvent(event);
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <p>Title: </p>
            <input type='title' value={title} onChange={e => setTitle(e.target.value)} />

            <p>Date: {props.date}</p>

            <p>Start time: </p>
            <input type='time' value={time} onChange={e => setTime((e.target.value))} />

            <p>Meeting with: </p>
            <input type='user' value={user} onChange={e => setUser(e.target.value)} />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='primary' onClick={handleSubmit}>Add Event</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CalEvent;