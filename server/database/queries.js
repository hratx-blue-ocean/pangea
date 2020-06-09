const mongoose = require('mongoose');
const {users, messages} = require('./schema');

// returns the requested user object: see schema.js for format
const findUser = (username, callback) => {
  users.find({username: username}).lean().exec((err, data) => {
    if (err) {
      console.log('Could not find user in database!', err)
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

// returns all users that are fluent in specified language
const findUserByLang = (lang, callback) => {
  users.find({langFluent: { $all: [lang]}}).lean().exec((err, data) => {
    if (err) {
      console.log('Could not find user with language in DB', err)
      callback(err, null)
    } else {
      console.log(data._id);
      callback(null, data);
    }
  })
};

// saves user object in database: see schema.js for format
const createUser = (user, callback) => {
  console.log(user);
  let doc = new users(user);

  doc.save((err, data) => {
    if (err) {
      console.log("Could not create new user")
      callback(err, null)
    } else {
      console.log(data._id)
      callback(null, data)
    }
  })
};

//updates the user object conversation ID that the user is a part of
// can just be ID number
const updateUserConvos = (username, convoId, callback) => {
  console.log(username, convoID);
  users.findOneAndUpdate({username: username}, { $push: {"convoId": convoId} }, {useFindAndModify: false}, (err, data) => {
    if (err) {
      console.log("Could not update user convoId in DB")
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

// gets conversation between two users by ID
const getConvo = (convoId, callback) => {
  messages.find({"_id": `ObjectId(${convoId})`}).lean().exec((err, data) => {
    if (err) {
      console.log("could not find message ID in database")
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

// TODO: handle placement of data in database
// must be in schema format, convo input is an object
const createConvo = (convo, callback) => {
  //front end sends convo (convo is data of who both users are)
  console.log(convo)
  let doc = new messages(convo);

  doc.save((err, data) => {
    if (err) {
      console.log("could not save conversation data in DB")
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

const updateMessages = (convoId, messageData, callback) => {
  // expecting conversation id, and updated messages.
  // may need to set on interval to send messages to database
  console.log(convoId, messageData);
  messages.findOneAndUpdate({"_id": `ObjectId(${convoId})`}, messageData, {useFindAndModify: false}, (err, data) => {
    if (err) {
      console.log("could not update messages in database")
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

module.exports ={
  createConvo,
  getConvo,
  createUser,
  findUser,
  updateMessages,
  findUserByLang
}