var express = require('express');
var passport = require('passport')
var router = express.Router();
var User = require('../models/user-model')

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.send('attempting log in!')
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      res.send(err)
    }
    passport.authenticate('local')(req, res, function () {
      console.log(req, res)
      // if (!user.username) res.send('400', user)
      res.send(user)
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  console.log(req.session)
  res.send('logged out')
});

module.exports = router;
