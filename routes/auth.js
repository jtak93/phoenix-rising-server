var express = require('express');
var passport = require('passport')
var router = express.Router();
var User = require('../models/user-model')

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  var user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    stats: req.user.stats,
  }
  res.status(200).send({
    msg: 'logged in successfully',
    user
  })
});

router.post('/register', function(req, res) {
  // check for unique email
  User.findOne({email: req.body.email}, function (err, user) {
    if (user) {
      res.status(409).send({message:'Email already in use'})
    } else {
      var stats = {
        weapon: {
          type: 'bullet',
          level: 1
        },
        abilities: [
          { name: 'shield', duration: 2000, coolDownTimer: 0, coolDownDuration: 5000 }
        ],
        maxHealth: 10,
        firingRateLevel: 1
      }
      User.register(new User({ username : req.body.username, email: req.body.email, stats: stats }), req.body.password, function(err, user) {
        console.log(user)
        if (err) res.status(409).send({message:'Username already in use'})
        if (user) {
          var userData = {
            _id: user._id,
            username: user.username,
            stats: user.stats,
            email: user.email,
          }
        }
        passport.authenticate('local')(req, res, function () {
          if (userData) res.status(201).send(userData)
        });
      })
    }
  })
});

router.get('/logout', function(req, res) {
  req.logout();
  console.log(req.session)
  res.send('logged out')
});

module.exports = router;
