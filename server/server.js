//TODO: refactor to express router file structure
const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const queries = require('./database/queries');
const bodyParser = require('body-parser');

//authentication middleware
const { check, validationResult } = require('express-validator'); 
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
app.post('/api/signup', [
  check('firstName').not().isEmpty().trim().escape(),
  check('lastName').not().isEmpty().trim().escape(),
  check('username').not().isEmpty().isEmail().normalizeEmail(),
  check('password').not().isEmpty().custom(value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(value)).trim().escape()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).jsonp(errors.array());
  } else {
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
  }
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
app.get('/api/findUserByLang/:lang', (req, res) => {
    queries.findUserByLang(req.params.lang, (err, data) => {
      if (err) {
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

app.post('/api/updateUser', function (req, res) {
  console.log(req.body, 'is req.body working?')
  queries.updateUser(req.body.username, req.body, (err, data) => {
    if (err) {
      res.status(500).send("error updating user in server")
   } else {
      res.send("user updated!");
    }
  })
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});