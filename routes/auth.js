var express = require('express');
var passport = require('passport')
var router = express.Router();
var User = require('../models/user-model')

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.send('logged in!')
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      res.send(err)
    }
    console.log('user created:', user)
    passport.authenticate('local')(req, res, function () {
      res.send('200', user)
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  console.log(req.session)
  res.send('logged out')
});

module.exports = router;
