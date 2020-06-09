const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
/*TODO: import queries
const queries = require(../)
*/

// open up CORS
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "../client/public")))

app.get('/api/findUser', function (req, res) {
    queries.findUser(), (err,data) => {
      if (err) {
        console.log("error finding user in server:", err)
        res.send("error finding user in server")
      }
      console.log("user found!");
      res.send(data);
    }
  });

  //front end decide way to pass data req?
  app.get('/api/createUser', function (req, res) {
    queries.createUser(), (err,data) => {
      if (err) {
        console.log("error creating user in route:", err)
        res.send("error getting all users data in server")
      }
      console.log("user created!");
      res.send(data);
    }
  });

  app.get('/api/updateUserConvos', function (req, res) {
    queries.updateUserConvos(), (err,data) => {
      if (err) {
        console.log("error updating user convos in server:", err)
        res.send("error updating user convos in server")
      }
      console.log("user convo updated!");
      res.send(data);
    }
  });

  app.get('/api/getConvo', function (req, res) {
    queries.getConvo(), (err,data) => {
      if (err) {
        console.log("error getting convo in server:", err)
        res.send("error getting convo in server")
      }
      console.log("convo gotten!");
      res.send(data);
    }
  });
  //TODO: HANDLE DATA input, pass to querey
  app.get('/api/createConvo', function (req, res) {
    queries.createConvo(), (err,data) => {
      if (err) {
        console.log("error creating convo in server:", err)
        res.send("error creating convo in server")
      }
      console.log("convo created!");
      res.send(data);
    }
  });

  app.get('/api/updateMessages', function (req, res) {
    queries.updateMessages(), (err,data) => {
      if (err) {
        console.log("error updating messeges in server:", err)
        res.send("error updating messages in server")
      }
      console.log("messages updated!");
      res.send(data);
    }
  });

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});