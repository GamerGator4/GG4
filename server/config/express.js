var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    eventsRouter = require('../routes/events.server.routes'),
    session = require('express-session'),
    passport = require('passport');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  app.use('/', express.static(__dirname + '/../../client'));

  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/events', eventsRouter);

  // set up session
  app.use(session({
    secret:'thesecret'
    saveUninitialized:false,
    resave:false
  }))

  /**TODO
  Go to homepage for all routes not specified */
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('client/index.html'));
  });

  return app;
};
