const mongoose = require('mongoose');
//const config = require('./config');


mongoose.connect('mongodb://localhost:27017/pangaea', {useNewUrlParser: true})
.then(() => {
  console.log("Database connected!")
})
.catch(err => {
  console.log("Could not connect to database!")
})
//db = "Users"
    //Collection = "accounts" use userSchema
    //Collection = "messages" use messageSchema

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

var messageSchema = new mongoose.Schema({
    convoId: Number,
    messages: [
      {userID: Number, timestamp: Date, message: String}
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

const users = mongoose.model('user', userSchema);
const messages = mongoose.model('message', messageSchema);

module.exports = {
  users,
  messages
}