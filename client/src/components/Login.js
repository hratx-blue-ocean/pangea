import React, { useState } from 'react';
import validator from 'email-validator';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Login = props => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [validEmail, setValidEmail] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [validated, setValidated] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const validateForm = () => {
    if (validator.validate(email) && password.length > 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (validateForm()) {
      login();
    }
  }

  const login = () => {

    axios.get(`http://pangea-env.eba-8xp63xtj.us-east-2.elasticbeanstalk.com/api/login/${email}/${password}`)
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
      <Button variant='outline-light' className='custombtn customwhite'  onClick={handleShow}>Login</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {authError ? <Alert variant={'danger'}>Invalid email and/or password</Alert> : null}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control required type='email' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
              <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
              <Form.Control.Feedback type='invalid'>Password required</Form.Control.Feedback>
            </Form.Group>

            <Button variant='light' className='custombtn' style={{color: 'black', marginRight: '5px'}} onClick={handleClose}>Cancel</Button>
            <Button variant='light' className='custombtn' style={{color: 'black'}} type='submit' onClick={handleSubmit}>Login</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Login;