var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    nunjucks = require('nunjucks');

MongoClient.connect('mongodb://localhost:27017/predictionleague', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    var cursor = db.collection('users').find({ 
      _id: "wolvesdave@gmail.com"
    }).project({ "monthlyScore.score": 1 });

   console.log(cursor);

});
