var express = require('express');
var router = express.Router();

var Fixtures = require('../models/Fixtures.js');

/* GET /Fixtures listing. */
router.get('/', function(req, res, next) {
  Fixtures.find(function (err, Fixtures) {
    if (err) return next(err);
    res.json(Fixtures);
  });
});

/* POST /Fixtures */
router.post('/', function(req, res, next) {
  Fixtures.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Fixtures/id */
router.get('/:id', function(req, res, next) {
  Fixtures.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Fixtures/round/id */
router.get('/round/:id', function(req, res, next) {
  Fixtures.find({Round: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Fixtures/:id */
router.put('/:id', function(req, res, next) {
  Fixtures.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Fixtures/:id */
router.delete('/:id', function(req, res, next) {
  Fixtures.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
