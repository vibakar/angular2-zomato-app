const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('./server/db/connection');
const passport = require('./server/auth/passport');
const connectflash = require('connect-flash');
const session = require('express-session');
// Get our API routes
const users = require('./server/users/userRouter');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({secret:'accesskey'}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(connectflash());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req,res,next){
  if(req.url=="/login"){
    if(req.session.email){
      res.redirect('/home');
    }
  }
  next()
});
// Set our api routes
app.use('/users', users);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Get port from environment and store in Express
const port = process.env.PORT || '8087';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`APP running on localhost:${port}`));
