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
  User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      res.send(err)
    }
    passport.authenticate('local')(req, res, function () {
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
      User.findOneAndUpdate(req.user._id, {stats}, function(err, user) {
        res.send(user)
      })
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  console.log(req.session)
  res.send('logged out')
});

module.exports = router;
