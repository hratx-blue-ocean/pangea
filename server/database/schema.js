const mongoose = require('mongoose');
const config = require('./mongoConfig');


mongoose.connect(`${config}`, {useNewUrlParser: true})
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
  username: String,
  langFluent: Array,
  langInterested: Array,
  profile: Object,
  onlineStatus: Boolean,
  password: String,
  convoIds: Array
})

var messageSchema = new mongoose.Schema({
<<<<<<< HEAD
    convoId: Number,
    messages: Object
=======
    messages: [
      // each object is one user, multiple users === multiple objects
      {userID: String, timestamp: String, message:String}
      //{userId: secondUser, timestamp: secondTime, message: secondMessage},
    ]
>>>>>>> d0ebb2c950d99cf0f2ba1928d139797d19f57d58
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