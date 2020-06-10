import React from 'react';
import Talk from 'talkjs';
// import ChatTitle from './ChatTitle';
import MessageList from './MessageList';
// import SendMessageForm from './SendMessageForm';
// import RoomList from './components/RoomList'
// import NewRoomForm from './components/NewRoomForm'

//import { tokenUrl, instanceLocator } from '../config/config';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.talkjsContainer = React.createRef();
  }
  // constructor() {
  //   super()
  //   this.state = {
  //       currentRoomId: null,
  //       joinableRooms: [],
  //       joinedRooms: [],
  //       messages: []
  //   }
  //   this.subscribeToRoom = this.subscribeToRoom.bind(this)
  //   this.sendMessage = this.sendMessage.bind(this)
  //   this.subscribeToRoom = this.subscribeToRoom.bind(this)
  // }

  componentDidMount() {
    const currentUser = this.props.currentUser;
    Talk.ready.then(() => {
        var me = new Talk.User({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            photoUrl: currentUser.photo,
            welcomeMessage: "Hey there! How are you? :-)"
        });
    })
  }

  window.talkSession = new Talk.Session({
    appId: "tVSZLKOS",
    me: me
  });

  var other = new Talk.User({
    id: "654321",
    name: "Sebastian",
    email: "Sebastian@example.com",
    photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
    welcomeMessage: "Hey, how can I help?"
  });  

  render() {
    return (
        <div ref={this.talkjsContainer}>

        </div>
    )
  }
}

export default Chat;