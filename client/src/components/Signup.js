import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import validator from 'email-validator';

import LangSelect from './LangSelect';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: '',
      validEmail: true,
      password: '',
      langFluent: '',
      langInterested: '',
      currentLocation: '',
      isLoading: true,
      token: '',
      signUpError: ''
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

  handleSubmit() {
    if (!validator.validate(this.state.email)) {
      this.setState({validEmail: false})
    } else {
      this.setState({
        validEmail: true,
        show: false,
      });
    }
  }

  selectLanguage(reason, lang) {
    this.setState({[reason]: lang})
  }

  render() {
    return (
      <>
        <Button variant='primary' onClick={this.handleShow}>Signup</Button>
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <input type='text' placeholder='email' value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
              {!this.state.validEmail ? <Alert variant={'danger'}>Please enter a valid email address</Alert> : null}
              <input type='password' placeholder ='password' value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
              <div> 
                <span>Select your proficient language: </span>
                <LangSelect select={this.selectLanguage} reason={'langFluent'} />
              </div>
              <div>
                <span>Select the language you are learning: </span>
                <LangSelect select={this.selectLanguage} reason={'langInterested'} />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>Cancel</Button>
            <Button variant='primary' onClick={this.handleSubmit}>Signup</Button>
          </Modal.Footer>
          
        </Modal>
      </>
    )
  }
}

export default Signup;