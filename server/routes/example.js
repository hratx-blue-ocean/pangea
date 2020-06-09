const express = require('express');
const app = express();
//const router = require('express').Router
const db = require('../database/queries');

app.use(express.json());

//route to validate new user from :Cory et Blake
app.post('/signup', (req, res) => {
  //check if new user via db query
console.log(req.body,req.query,req.params);
  db.findUser(req.body.email, (err, result) => {
    // if user exists, res.send('User already exists')
    // else
      db.createUser(req.body, (err, results) => {
        
      })
  })
})

module.exports = app;







