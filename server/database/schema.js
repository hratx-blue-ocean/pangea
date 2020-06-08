const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config, {useNewUrlParser: true})
.then(() => {
  console.log("Database connected!")
})
.catch(err => {
  console.log("Could not connect to database!")
})

var userSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  langFluent: Object,
  langInterested: Object,
  profile: Object,
  onlineStatus: Boolean,
  password: String,
  convoIds: Object
})

var convoSchema = new mongoose.Schema({
    convoId: Number,
    messages: [
      {userID, timestamp, message}
    ]
  /*
  to access with query: if convoID matches, pull entire convo object
     messages: [
      {userID, timestamp, message},
      {userID, timestamp, message},
      {userID, timestamp, message}
    ]
   */
})