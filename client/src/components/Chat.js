import React, { Fragment } from 'react';
import Talk from 'talkjs';


class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
    let currentUser;
    const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
    if (currentTalkjsUser) {
        currentUser = JSON.parse(currentTalkjsUser)
    }

    this.state = {
        currentUser
    }
  }

  componentDidMount() {
    Talk.ready
    .then(() => {
      const me = new Talk.User(this.state.currentUser);
      
      if (!window.talkSession) {
          window.talkSession = new Talk.Session({
              appId: 'tVSZLKOS',
              me: me
          });
      }
  
      this.inbox = window.talkSession.createInbox();
      this.inbox.mount(this.container);

    })
    .catch(e => console.error(e));
  }

  // window.talkSession = new Talk.Session({
  //   appId: "tVSZLKOS",
  //   me: me
  // });

  // var other = new Talk.User({
  //   id: "654321",
  //   name: "Sebastian",
  //   email: "Sebastian@example.com",
  //   photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
  //   welcomeMessage: "Hey, how can I help?"
  // });  

  render() {
    return (
      <Fragment>
          <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
      </Fragment>
    );
  }
}

export default Chat;