var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionUser = {
    session: req.session,
    user: req.user
  }
  res.send(sessionUser)
});

module.exports = router;
