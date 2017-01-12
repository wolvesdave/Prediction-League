// Import required modules
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017/predictionleague', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    // Handler for internal server errors
    function errorHandler(err, req, res, next) {
        console.error(err.message);
        console.error(err.stack);
        res.status(500).render('error_template', { error: err });
    }

    app.get('/getprediction/', function(req, res, next) {
        var userEmail = req.query.userEmail;
        var round = parseInt(req.query.round);
        db.collection('predictions').find({ Round : round , userEmail : userEmail}).toArray(function(err, docs) {
            res.set('Content-Type','application/json');
            res.render('predictions', { 'userEmail' : userEmail, 'round' : round , 'predictions': docs } );
        });
    });

    app.get('/viewscores/:name', function(req, res){
      var name = req.params.name;
      var round = req.query.round;
      res.set('Content-Type','application/json');
      res.render('scores', { name : name, round : round });
    });

    app.get('/viewtable/:round', function(req, res){
      var round = req.params.round;
      console.log("about to check fixtures for ", round);
      db.collection('fixtures').find({Round : round}).toArray(function(err, docs) {
          res.set('Content-Type','application/json');
          res.send(200, docs );
          /* res.render('fixtures', { 'round' : round , 'fixtures': docs } ); */
      });
    });

    app.get('/putprediction', function(req, res, next) {
        res.render('gamePicker', { 'games' : [ 'ManU', 'Arsenal', 'Chelsea', 'Wolves' ] });
    });

    app.post('/storeprediction', function(req, res, next) {
        var favorite = req.body.game;
        if (typeof favorite == 'undefined') {
            next('Please choose a game!');
        }
        else {
            res.send("Your favorite game is " + favorite);
        }
    });

    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s', port);
    });

  });
