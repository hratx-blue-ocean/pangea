import React, { useState } from 'react';
import validator from 'email-validator';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const SignupForm = props => {
  const [langs] = useState(['English', 'Spanish', 'Mandarin', 'Hindi', 'German', 'French']);

  return (
    <Formik
    
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        langFluent: 'English',
        langInterested: 'Spanish'
      }}
      validate={values => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'First Name Required';
        } else if (!/^[A-Za-z]+$/.test(values.firstName)) {
          errors.firstName = 'Must only contain letters.'
        }

        if (!values.lastName) {
          errors.lastName = 'Last Name Required';
        } else if (!/^[A-Za-z]+$/.test(values.lastName)) {
          errors.lastName = 'Must only contain letters.'
        }

        if (!values.username) {
          errors.username = 'Email Required';
        } else if (!validator.validate(values.username)){
          errors.username = 'Must be a valid email address.'
        }

        if (!values.password) {
          errors.password = 'Password Required';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(values.password)){
          errors.password = 'Your password must be 8-20 characters long, contain at least one capital and one lowercase letter, a number, and one special character (!@#$%^&*).'
        }

        return errors;
      }}
      onSubmit={values => {
        console.log(values)
        props.signup(values)
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        isSubmitting,
        isInvalid
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {/* <Form.Group>
            <Form.File required id='profilePic' label='Upload Profile Picture' onChange={e => console.log(e.currentTarget)} />
          </Form.Group> */}

          <Row>
            <Col>
              <Form.Group controlId= "firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name='firstName'
                  type='text'
                  placeholder='First Name'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name='lastName'
                  type='text'
                  placeholder='Last Name'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback  type='invalid'>{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId='formEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name='username'
              type='email'
              placeholder='Enter Email'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback  type='invalid'>{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback  type='invalid'>{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Proficient Language</Form.Label>
                <Form.Control as='select' name='langFluent' value={values.langFluent} onChange={handleChange}>
                  {langs.map((lang, i) => <option key={i}>{lang}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Learning Language</Form.Label>
                <Form.Control as='select' name='langInterested' value={values.langInterested} onChange={handleChange}>
                  {langs.map((lang, i) => <option key={i}>{lang}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button variant='light' className='custombtn' style={{color: 'black', marginRight: '5px'}} onClick={props.close}>Cancel</Button>
          <Button variant='light' className='custombtn' style={{color: 'black'}} type='submit' onSubmit={handleSubmit}>Signup</Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm;
