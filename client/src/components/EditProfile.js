import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class EditProfile extends React.Component {
    constructor(props) {
        super(props); 
        let currentUser;
        const currentTalkjsUser = {
          id: "4",
          name: "Grace Loveday",
          email: "grace@sample.com",
          photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
          role: "Member",
          info: "Product Designer at Google",
          welcomeMessage: "Hey there! Love to chat :-)"
      };
        if (currentTalkjsUser) {
            currentUser = currentTalkjsUser
        }
        this.state = {
          langs: ['English', 'Spanish', 'Mandarin', 'Hindi', 'German', 'French'],
          langInterested: [],
            currentUser,
            show: false
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
        const user = userInfo
        console.log("this is in handleSubmit")
        axios.post(`/api/updateUser`, {
          username: user.username,
          langFluent: user.langFluent,
          langInterested: this.state.langInterested,
          profile: user.profile,
          events: user.events,
          onlineStatus: user.onlineStatus,
          password: user.password,
          convoIds: user.convoIds,
          imageLink: user.imageLink,
        })
        .then(function (response) {  
          console.log(response);
        })
        .catch(err => {
          console.log(err.response.status, 'Error updating userlang');
        })
      }

      selectLanguage(reason, lang) {
        this.setState({[reason]: lang})
      }


    render() {
        console.log(this.props.userInfo);
        <>
        
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
           </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
            <Col>
                  <Form.Group>
                    <Form.Label>Language I'm interested in learning</Form.Label>
                    <Form.Control required as='select' defaultValue={userInfo.languageInterested[0]} onChange={e => this.setState({langInterested: [e.target.value]})}>
                      {this.state.langs.map((lang, i) => <option key={i}>{lang}</option>)}
                    </Form.Control>
                  </Form.Group>
                </Col>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>Cancel</Button>
            <Button variant='primary' onClick={this.handleSubmit}>Save</Button>
          </Modal.Footer>          
        </Modal>
      </>
    }
  }

  export default EditProfile;