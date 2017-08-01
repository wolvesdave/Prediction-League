var express = require('express');
var router = express.Router();

var Predictions = require('../models/Predictions.js');

/* GET /predictions listing. */
router.get('/', function(req, res, next) {
  Predictions.find(function (err, predictions) {
    if (err) return next(err);
    res.json(predictions);
  });
});

/* GET /Predictions/round/id */
router.get('/round/:id', function(req, res, next) {
  Predictions.find({round: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Predictions/user/id */
router.get('/user/:id', function(req, res, next) {
  Predictions.find({userEmail: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /Predictions */
router.post('/', function(req, res, next) {
  Predictions.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Predictions/id */
router.get('/:id', function(req, res, next) {
  Predictions.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Predictions/:id */
router.put('/:id', function(req, res, next) {
  Predictions.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Predictions/:id */
router.delete('/:id', function(req, res, next) {
  Predictions.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
