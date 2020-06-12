import React from 'react';
import Talk from 'talkjs';
import './PenPals.css';
import axios from 'axios';


class PenPals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: null
    }
  }
  componentDidMount() {
    this.updateUser()
    this.grabPenPals()
  }

  updateUser() {
    this.setState({currentUser: this.props.location.state })
  }

  grabPenPals() {
    let langSearch = {
        lang: this.props.location.state.userData.langInterested
    }
    axios.get(`/api/findUserByLang/${langSearch.lang[0]}`)
      .then((data) => {
        this.setState({
        relatedUser : data.data
      })
      })
      .catch((error) => {
        console.log('error grabbing related users', error)
    })
  }

  handleClick(userId) {
    /* Retrieve the two users that will participate in the conversation */
    const currentUser = {
      id: this.state.currentUser.userData._id,
      name: this.state.currentUser.userData.firstName,
      email: this.state.currentUser.userData.username,
      photoUrl: this.state.currentUser.userData.imageLink,
      welcomeMessage: this.state.currentUser.userData.langFluent[0]
    };

    const user = this.state.relatedUser.find(user => user._id === userId)
    user.id = user._id;
    user.name = user.firstName;
    user.email = user.username;
    user.photoUrl = user.imageLink;
    user.info = user.langInterested;
    user.welcomeMessage = user.langFluent[0];
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
    // const { currentUser } = this.state;

    return (
      <div className="users">
          <div className="current-user-container">
            {this.state.currentUser &&
              <div>
                <picture className="current-user-picture">
              <img alt={this.state.currentUser.userData.username} src={this.state.currentUser.userData.imageLink} />
            </picture>
                <div className="current-user-info">
                    <h3>{this.state.currentUser.userData.firstName}</h3>
                    <p>Teaching:{this.state.currentUser.userData.langFluent}</p>
                    <p>Interested in learning:{this.state.currentUser.userData.langInterested}</p>
                </div>
              </div>
            }
          </div>

          <div className="users-container"> 
          <ul>
            {this.state.relatedUser &&
              <div>
                {this.state.relatedUser.map(user => 
                  <li key={user._id} className="user">
                      <picture className="user-picture">
                          <img src={user.imageLink} alt={`${user.firstName}`} />
                      </picture>
                      <div className="user-info-container">
                          <div className="user-info">
                              <h4>{user.firstName}</h4>
                              <p>{user.lastName}</p>
                          </div>
                          <div className="user-action">

                              <button onClick={(userId) => this.handleClick(user._id)}>Message</button>
                          </div>
                      </div>
                  </li>
                )}
            </div>
            }
              </ul>
              <div className="chatbox-container" ref={c => this.container = c}>
                  <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
              </div>
          </div>
      </div>
    )
  }
}

export default PenPals;
