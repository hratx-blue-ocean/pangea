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

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});