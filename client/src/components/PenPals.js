import React from 'react';
import Talk from 'talkjs';
import { sampleUsers } from './sampleUsers';
import './PenPals.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import LangSelect from './LangSelect';


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
    if (!validator.validate(this.state.email)) {
      this.setState({validEmail: false})
    } else {
      this.setState({
        validEmail: true
      });
      this.signup();
    }
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
    const { currentUser } = this.state;
     // can you see this?
    return (
      <div>
      <>
        
        
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              {/* {this.state.failedSignup ? <Alert variant={'danger'}>Email is already in use</Alert> : null}
              <input type='text' placeholder='email' value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
              {!this.state.validEmail ? <Alert variant={'danger'}>Please enter a valid email address</Alert> : null}
              <input type='password' placeholder ='password' value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
              <div> 
                <span>Select your proficient language: </span>
                <LangSelect select={this.selectLanguage} reason={'langFluent'} />
              </div> */}
              {/* <div>
                <span>Select the language you are learning: </span>
                <LangSelect select={this.selectLanguage} reason={'langInterested'} />
 */}
                <form>
              <div class="multiselect">
                <div class="selectBox" onclick="showCheckboxes()">
                  <select>
                    <option>Select an option</option>
                  </select>
                  <div class="overSelect"></div>
                </div>
                <div id="checkboxes">
                  <label for="one">
                    <input type="checkbox" id="one" />First checkbox</label>
                  <label for="two">
                    <input type="checkbox" id="two" />Second checkbox</label>
                  <label for="three">
                    <input type="checkbox" id="three" />Third checkbox</label>
                </div>
              </div>
            </form>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>Cancel</Button>
            <Button variant='primary' onClick={this.handleSubmit}>Signup</Button>
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
