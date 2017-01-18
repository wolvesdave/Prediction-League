// Import required modules
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    path = require('path'),
    CollectionDriver = require('./collectionDriver').CollectionDriver;

var collectionDriver;

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/predictionleague', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    collectionDriver = new CollectionDriver(db); //F

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
      console.log("about to check predictions for ", name, " ", round);
      db.collection('predictions').find({userEmail : 'name', Round : round}).toArray(function(err, docs) {
        console.log("Found this many: ", docs.length)
        res.set('Content-Type','application/json');
        res.status(200).send(docs);
      /* res.render('scores', { name : name, round : round });*/
      });
    });

    app.get('/viewtable/:round', function(req, res){
      var round = req.params.round;
      console.log("about to check fixtures for ", round);
      db.collection('fixtures').find({Round : round}).toArray(function(err, docs) {
          res.set('Content-Type','application/json');
          res.status(200).send(docs );
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

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function (req, res) {
      res.send('<html><body><h1>Hello World</h1></body></html>');
    });

    app.get('/:collection', function(req, res) { //A
       var params = req.params; //B
       collectionDriver.findAll(req.params.collection, function(error, objs) { //C
        	  if (error) { res.send(400, error); } //D
    	      else {
    	          if (req.accepts('html')) { //E
        	          res.render('data',{objects: objs, collection: req.params.collection}); //F
                  } else {
    	          res.set('Content-Type','application/json'); //G
                      res.status(200).send(objs); //H
                  }
             }
       	});
    });

    app.get('/:collection/:entity', function(req, res) { //I
       var params = req.params;
       var entity = params.entity;
       var collection = params.collection;
       if (entity) {
           collectionDriver.get(collection, entity, function(error, objs) { //J
              if (error) { res.status(400).send(error); }
              else { res.status(200).send(objs); } //K
           });
       } else {
          res.status(400).send({error: 'bad url', url: req.url});
       }
    });

    app.post('/:collection', function(req, res) { //A
        var object = req.body;
        var collection = req.params.collection;
        collectionDriver.save(collection, object, function(err,docs) {
              if (err) { res.status(400).send(err); }
              else { res.status(201).send(docs); } //B
         });
    });

    app.put('/:collection/:entity', function(req, res) { //A
        var params = req.params;
        var entity = params.entity;
        var collection = params.collection;
        if (entity) {
           collectionDriver.update(collection, req.body, entity, function(error, objs) { //B
              if (error) { res.status(400).send(error); }
              else { res.status(200).send(objs); } //C
           });
       } else {
    	   var error = { "message" : "Cannot PUT a whole collection" }
    	   res.status(400).send(error);
       }
    });

    app.delete('/:collection/:entity', function(req, res) { //A
        var params = req.params;
        var entity = params.entity;
        var collection = params.collection;
        if (entity) {
           collectionDriver.delete(collection, entity, function(error, objs) { //B
              if (error) { res.status(400).send(error); }
              else { res.status(200).send(objs); } //C 200 b/c includes the original doc
           });
       } else {
           var error = { "message" : "Cannot DELETE a whole collection" }
           res.status(400).send(error);
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
