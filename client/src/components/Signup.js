import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import SignupForm from './SignupForm';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      invalidPassword: false,
      emailUsed: false
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleShow() {
    this.setState({show: true})
  }

  handleClose() {
    this.setState({show: false})
  }

  signup(body) {
    body.onlineStatus = true;
    body.imageLink = "https://picsum.photos/seed/picsum/200/300";

    axios.post('/api/signup', body)
      .then(( {data} ) => {
        this.props.login(data)
      })
      .catch(err => {
        if (err.response.status === 422) {
          this.setState({invalidPassword: true})
        } else {
          this.setState({
            invalidPassword: false,
            emailUsed: true
          })
        }
      })
  }

  render() {
    return (
      <>
        <Button variant='outline-light' className='custombtn customwhite' onClick={e => this.handleShow(e)}>Signup</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.emailUsed ? <Alert variant={'danger'}>Email is already in use</Alert> : null}
            {this.state.invalidPassword ? <Alert variant={'danger'}>Invalid password</Alert> : null}
            <SignupForm close={this.handleClose} signup={this.signup}/>

          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Signup;