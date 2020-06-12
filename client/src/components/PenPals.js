import React from 'react';
import Talk from 'talkjs';
import { sampleUsers } from './sampleUsers';
import './PenPals.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'

import LangSelect from './LangSelect';
import EditProfile from './EditProfile';


class PenPals extends React.Component {
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
    const user = this.props.location.state.userData
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
    this.setState({show: false})
  }

  selectLanguage(reason, lang) {
    this.setState({[reason]: lang})
  }

  handleClick(userId) {
 
    /* Retrieve the two users that will participate in the conversation */
    const { currentUser } = this.state;
    const user = sampleUsers.find(user => user.id === userId)

    /* Session initialization code */
    Talk.ready
    .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User(currentUser);
        const other = new Talk.User(user)

        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
            window.talkSession = new Talk.Session({
                appId:  'tVSZLKOS',
                me: me
            });
        } 
        
        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(conversationId);
        
        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
    })            
    .catch(e => console.error(e));
  }


  render() {
    console.log(this.props.location.state)
    console.log(this.props.location.state)
    console.log("this is in PenPals", this.props.location.state.userData.langInterested[0])
    const langUserWantsToLearn = this.props.location.state.userData.langInterested;
    const { currentUser } = this.state;
     // can you see this?
    return (
      <div>
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
                    <Form.Control required as='select' defaultValue={langUserWantsToLearn[0]} onChange={e => this.setState({langInterested: [e.target.value]})}>
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
      
      <div className="users">
          <div className="current-user-container">
            {currentUser &&
            
              <div>
                
                <picture className="current-user-picture">
              <img alt={currentUser.name} src={currentUser.photoUrl} />
            </picture>
            {currentUser.info}
                <div className="current-user-info">
                    <h3>{currentUser.name}</h3>
                    <p>{currentUser.description}</p>
                    {/* <button>Edit Profile</button> */}
                    <Button variant='outline-light' id='custombtn' onClick={this.handleShow}>Edit Profile</Button>
                </div>
              </div>
            }
          </div>

          <div className="users-container"> 
              <ul>
                  {sampleUsers.map(user => 
                    <li key={user.id} className="user">
                        <picture className="user-picture">
                            <img src={user.photoUrl} alt={`${user.name}`} />
                        </picture>
                        <div className="user-info-container">
                            <div className="user-info">
                                <h4>{user.name}</h4>
                                <p>{user.info}</p>
                            </div>
                            <div className="user-action">

                                <button onClick={(userId) => this.handleClick(user.id)}>Message</button>
                            </div>
                        </div>
                    </li>
                  )}
              </ul>

              <div className="chatbox-container" ref={c => this.container = c}>
                  <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
              </div>
          </div>
      </div>
      </div>
    )
  }
}

export default PenPals;
