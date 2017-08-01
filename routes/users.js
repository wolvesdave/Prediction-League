var express = require('express');
var router = express.Router();

var Users = require('../models/Users.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  Users.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
