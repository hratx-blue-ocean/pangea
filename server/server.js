const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const queries = require('./database/queries')


//TODO: set correct HTTP actions, not all will be get requests

// open up CORS
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "../client/public")))

app.get('/api/findUser', function (req, res) {
  const username = req.body.username;
  queries.findUser(username, (err,data) => {
      if (err) {
        console.log("error finding user in server:", err)
        res.send("error finding user in server")
      }
      console.log("user found!");
      res.send(data);
    })
  });

  app.post('/api/createUser', function (req, res) {
    const user = req.body.user;
    queries.createUser(user, (err,data) => {
      if (err) {
        console.log("error creating user in route:", err)
        res.send("error getting all users data in server")
      }
      console.log("user created!");
      res.send(data);
    })
  });

  app.put('/api/updateUserConvos', function (req, res) {
    const username = req.body.username;
    queries.updateUserConvos(username, convoId, (err,data) => {
      if (err) {
        console.log("error updating user convos in server:", err)
        res.send("error updating user convos in server")
      }
      console.log("user convo updated!");
      res.send(data);
    })
  });

  app.get('/api/getConvo', function (req, res) {
    const convoId = req.body.convoId;
    queries.getConvo(convoId, (err,data) => {
      if (err) {
        console.log("error getting convo in server:", err)
        res.send("error getting convo in server")
      }
      console.log("convo gotten!");
      res.send(data);
    })
  });

  app.post('/api/createConvo', function (req, res) {
    const convo = req.body.convo;
    queries.createConvo(convo, (err,data) => {
      if (err) {
        console.log("error creating convo in server:", err)
        res.send("error creating convo in server")
      }
      console.log("convo created!");
      res.send(data);
    })
  });

  app.put('/api/updateMessages', function (req, res) {
    const convoId = req.body.convoId;
    const messageData = req.body.messageData;
    queries.updateMessages(convoId, messageData, (err,data) => {
      if (err) {
        console.log("error updating messeges in server:", err)
        res.send("error updating messages in server")
      }
      console.log("messages updated!");
      res.send(data);
    })
  });

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});