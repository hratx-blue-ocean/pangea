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

app.use(express.static(path.join(__dirname, "../client/public/")))
app.use(bodyParser.json())

// ***** USER API'S *****

//signup route
app.post('/api/signup', (req, res) => {
  // check if the user exists
  queries.findUser(req.body.username, (err,data) => {
    if (err) {
      res.status(500).send('Error finding user')
    } else if (data.length === 0) {
      // if email doesn't exist, create user
      queries.createUser(req.body, (error, results) => {
        if (error) {
          res.status(500).send('Error creating account');
        } else {
          res.send(results);
        }
      })
    } else {
      //if user does exists
      res.status(401).send('Email already in use');
    }
  })
});

// login route
  app.get('/api/login/:username/:password', (req, res) => {
      
      queries.findUser(req.params.username, (err,data) => {
        if (data.length === 0 || err) {
          res.status(500).send("error finding user in server")
        } else {
          if (data[0].password === req.params.password) {
            res.send(data);
          } else {
            res.status(401).send('Unauthenticated');
          }
        }
      })
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

  app.post('/api/createEvent', function (req, res) {
    queries.createEvent(req.body, (err,data) => {
      if (err) {
        console.log("error creating event in server:", err)
        res.status(500).send("error creating event in server")
      } else {
        res.send(data);
      }
    })
  });

<<<<<<< HEAD
  // Finds all events for a user
  app.get('/api/getEvents', function (req, res) {
    console.log(req.body, 'made you look')
    queries.getEvent(req.body, (err,data) => {
      if (data.length === 0 || err) {
        console.log("error creating event in server:", err)
        res.status(500).send("error creating event in server")
      } else {
        console.log("event created!");
        res.send(data);
      }
    })
  });

  app.post('/api/updateUser', function (req, res) {
    console.log(req.body, 'is req.body working?')
    queries.updateUser(req.body.username, req.body, (err,data) => {
     if (!err) {
      res.send("user updated!");
     } else {
      res.status(500).send("error updating user in server")
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


=======
>>>>>>> 892f200f6f10a86ec26dc7e06b60289bd945b1ee
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});