import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Login = props => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    props.login();
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>Login</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}></input>

            <input type='password' placeholder ='password' value={password} onChange={e => setPassword(e.target.value)}></input>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='primary' onClick={handleSubmit}>Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login;