import React, { Fragment } from 'react';
import Talk from 'talkjs';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.inbox = undefined;
    this.state = {
      currentUser: {
        id: this.props.location.state.userData._id,
        name: this.props.location.state.userData.firstName,
        email: this.props.location.state.userData.username,
        photoUrl: this.props.location.state.userData.imageLink,
        welcomeMessage: this.props.location.state.userData.langFluent[0]
      }
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

  render() {
    return (
      <Fragment>
          <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
      </Fragment>
    );
  }
}

export default Chat;