const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const queries = require('./database/queries');
const bodyParser = require('body-parser');



// open up CORS
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "../client/public")))

// ***** USER API'S *****

// finds user *WORKS*
  app.get('/api/findUser', function (req, res) {
      queries.findUser(req.body.username, (err,data) => {
        if (data.length === 0 || err) {
          res.status(500).send("error finding user in server")
        } else {
          console.log("user found!");
          res.send(data);
        }
      })
    });

  //front end decide way to pass data req? *WORKS*
  app.post('/api/createUser', function (req, res) {
    console.log(req.body)
    if (req.body !== undefined) {
      queries.createUser(req.body, (err,data) => {
        if (data.length === 0 || err) {
          console.log("error creating user in route:", err)
          res.status(500).send("error getting all users data in server")
        } else {
          console.log("user created!");
          res.send(data);
        }
      })
    } else {
      res.status(500).send("invalid format")
    }
  });

  // Finds all users by fluent language *WORKS*
  app.get('/api/findUserByLang', (req, res) => {
    queries.findUserByLang(req.body.lang, (err, data) => {
      if (data.length === 0 || err) {
        res.status(500).send("Error finding users in DB")
      } else {
        res.send(data);
      }
    })
  });

  // ***** MESSAGE API's IF NEEDED *****

  // app.put('/api/updateUserConvos', function (req, res) {
  //   queries.updateUserConvos(req.body.id, (err,data) => {
  //     if (data.length === 0 || err) {
  //       console.log("error updating user convos in server:", err)
  //       res.status(500).send("error updating user convos in server")
  //     } else {
  //       console.log("user convo updated!");
  //       res.send(data);
  //     }
  //   })
  // });

  // app.get('/api/getConvo', function (req, res) {
  //   queries.getConvo(req.body.convoId, (err,data) => {
  //     if (data.length === 0 || err) {
  //       console.log("error getting convo in server:", err)
  //       res.status(500).send("error getting convo in server")
  //     } else {
  //       console.log("convo gotten!");
  //       res.send(data);
  //     }
  //   })
  // });

  // pass to body *WORKS*
  // app.post('/api/createConvo', function (req, res) {

  //   queries.createConvo(req.body, (err,data) => {
  //     if (data.length === 0 || err) {
  //       console.log("error creating convo in server:", err)
  //       res.status(500).send("error creating convo in server")
  //     } else {
  //       console.log("convo created!");
  //       res.send(data);
  //     }
  //   })
  // });

// app.put('/api/updateMessages', function (req, res) {
//   queries.updateMessages(req.body.id, (err, data) => {
//       if (data.length === 0 || err) {
//           console.log("error updating messeges in server:", err);
//           res.status(500).send("error updating messages in server");
//       } else {
//         console.log("messages updated!");
//         res.send(data);
//       }
//   });
// });


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});