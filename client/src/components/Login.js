import React, { useState } from 'react';
import validator from 'email-validator';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Login = props => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [authError, setAuthError] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    if (!validator.validate(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
      login();
    }
  }
  
  const login = () => {
    
    axios.get(`http://localhost:9000/api/login/${email}/${password}`)
      .then(( {data} ) => {
        props.login(data[0])
      })
      .catch(err => {
        console.log(err.response.status, 'Error finding user');
        setAuthError(true);
      })
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
            {authError ? <Alert variant={'danger'}>Invalid email and/or password</Alert> : null}
            <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}></input>
            {!validEmail ? <Alert variant={'danger'}>Please enter a valid email address</Alert> : null}
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