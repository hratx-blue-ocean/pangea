/* eslint-disable no-console */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import validator from 'email-validator';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      langs: ['English', 'Spanish', 'Mandarin', 'Hindi', 'German', 'French'],

      firstName: '',
      lastName: '',
      email: '',
      password: '',
      langFluent: 'English',
      langInterested: 'Spanish',
      currentLocation: '',
      imageLink: '',

      isLoading: true,
      token: '',
      signUpError: '',
      failedSignup: false,
      validated: false
    }
    
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  handleShow() {
    this.setState({show: true})
  }

  handleClose() {
    this.setState({show: false})
  }

  validateForm() {
    if (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      validator.validate(this.state.email) && 
      this.state.password.length > 0
    ) {
      return true;
    }
    return false;
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    this.setState({validated: true});
    
    if (this.validateForm()) {
      this.signup();
    }
  }

  signup() {
    const body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.email,
      langFluent: this.state.langFluent,
      langInterested: this.state.langInterested,
      password: this.state.password,
      onlineStatus: true,
      imageLink: this.state.imageLink
    }
    
    axios.post('/api/signup', body)
      .then(( {data} ) => {
        console.log(data)
        this.props.login(data)
      })
      .catch(err => {
        console.error(err, 'Error creating user');
        this.setState({failedSignup: true})
      })
  }

  selectLanguage(reason, lang) {
    this.setState({[reason]: lang})
  }

  render() {
    return (
      <>
        <Button variant='outline-light' id='custombtn' onClick={e => this.handleShow(e)}>Signup</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.failedSignup ? <Alert variant={'danger'}>Email is already in use</Alert> : null}
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.File required id='profilePic' label='Upload Profile Picture' onChange={e => console.log(e.currentTarget)} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required placeholder='First Name' onChange={e => this.setState({firstName: e.target.value})} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required placeholder='Last Name' onChange={e => this.setState({lastName: e.target.value})} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId='formEmail'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' onChange={e => this.setState({email: e.target.value})} />
                <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Password' onChange={e => this.setState({password: e.target.value})} />
                <Form.Control.Feedback type='invalid'>Password required</Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Proficient Language</Form.Label>
                    <Form.Control required as='select' defaultValue={this.state.langFluent} onChange={e => this.setState({langFluent: e.target.value})}>
                      {this.state.langs.map((lang, i) => <option key={i}>{lang}</option>)}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Learning Language</Form.Label>
                    <Form.Control required as='select' defaultValue={this.state.langInterested} onChange={e => this.setState({langInterested: e.target.value})}>
                      {this.state.langs.map((lang, i) => <option key={i}>{lang}</option>)}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='light' id='custombtn' style={{color: 'black', marginRight: '5px'}} onClick={this.handleClose}>Cancel</Button>
            <Button variant='light' id='custombtn' style={{color: 'black'}} type='submit' onClick={e => this.handleSubmit(e)}>Signup</Button>
          </Modal.Footer>
          
        </Modal>
      </>
    )
  }
}

export default Signup;