const mongoose = require('mongoose');
const mongoConfig = require('./mongoConfig');

mongoose.connect(mongoConfig.mongoConf, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Database connected!")
})
.catch(err => {
  console.log("Could not connect to database!",err)
})
//db = "Users"
    //Collection = "users" use userSchema
    //Collection = "messages" use messageSchema

var userSchema = new mongoose.Schema({
  username: String,
  langFluent: Array,
  langInterested: Array,
  profile: Array,
  events: Array,
  onlineStatus: Boolean,
  password: String,
  convoIds: Array,
  imageLink: String,
  firstName: String,
  lastName: String,
}, {collection: 'users'})

var messageSchema = new mongoose.Schema({
    messages: Object
  /*
  to access with query: if convoID matches, pull entire convo object
     messages: [
      {userID, timestamp, message},
      {userID, timestamp, message},
      {userID, timestamp, message}
    ]
   */
})

const users = mongoose.model('users', userSchema);
const messages = mongoose.model('messages', messageSchema);

module.exports = {
  users,
  messages
}