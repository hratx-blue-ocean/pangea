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
// object format: {"lang": "German"}
const findUserByLang = (lang, callback) => {
  users.find({langFluent: { $all: [lang]}}).lean().exec((err, data) => {
    if (err) {
      console.log('Could not find user with language in DB', err)
      callback(err, null)
    } else {
      console.log(data);
      callback(null, data);
    }
  })
};

// saves user object in database: see schema.js for format
const createUser = (user, callback) => {
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
  users.findOneAndUpdate({username: username}, { $push: {"convoId": convoId} }, {useFindAndModify: false}, (err, data) => {
    if (err) {
      console.log("Could not update user convoId in DB")
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

// create event for user
const createEvent = (userId, callback) => {
  users.findOneAndUpdate({ "_id": userId.userId }, {$push:{events: userId.event}}, {useFindAndModify: false})
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log("could not create users event in database")
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
};

const updateUser = (username, userObj, callback) => {  
  users.findOneAndUpdate({username: username}, userObj, {useFindAndModify: false}, (err, data) => {
    if (err) {
      console.log("Could not update user in DB")

      callback(err, null)
    } else {
      callback(null, data)
    }
  })
};

module.exports ={
  createEvent,
  getEvent,
  createUser,
  findUser,
  findUserByLang,
  updateUser