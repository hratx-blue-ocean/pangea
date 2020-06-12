const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const queries = require('./database/queries');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      // if email doesn't exist
      // generate salt
      bcrypt.genSalt(saltRounds)
        // hash password
        .then(salt => {
          return bcrypt.hash(req.body.password, salt);
        })
        // create user with hashed password to db
        .then(hash => {
          const userData = req.body;
          userData.password = hash;
          queries.createUser(userData, (error, results) => {
            if (error) {
              res.status(500).send('Error creating account');
            } else {
              //deletes password before sending response to client.
              delete results['_doc']['password'];
              res.send(results);
            }
          })
        })
        .catch(err => {
          res.status(401).send('Error with bcrypt');
        })
    } else {
      //if user does exists
      res.status(401).send('Email already in use');
    }
  })
});

// login route
app.get('/api/login/:username/:password', (req, res) => {
    
  queries.findUser(req.params.username, (err, data) => {
    if (data.length === 0 || err) {
      res.status(500).send("error finding user in server")
    } else {
      bcrypt.compare(req.params.password, data[0].password)
        .then(() => {
          // delete password before sending to client
          delete data[0]['password'];
          res.send(data)
        })
        .catch(err => {
          res.status(401).send('Unauthenticated');
        })
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