const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const app = express();
const queries = require(../)
/*TODO: import queries 
*/

// open up CORS
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));

//front end decide way to pass data req?
app.get('/api/createUser', function (req, res) {
    queries.createUser(err,data) => {
      if (err) {
        console.log("error creating user in route:", err)
        res.send("error getting all users data in server")
      }
      res.send("user created");
    })
  });
//need to finish
app.get('/api/createUser', function (req, res) {
    queries.createUser(err,data) => {
      if (err) {
        console.log("error creating user in route:", err)
        res.send("error getting all users data in server")
      }
      res.send("user created");
    })
  });

// execute before all routes to catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;