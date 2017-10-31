var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    nunjucks = require('nunjucks');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');
app.use(bodyParser.urlencoded({ extended: true }));

var env = nunjucks.configure('/path/to/templates', {
      tags: {
        // or whatever other tag markers you'd like to use
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
      }
    });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/public',express.static(__dirname + '/public'))

MongoClient.connect('mongodb://localhost:27017/predictionleague', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res, next) {
        res.render('index',{});
    });

    app.get('/api/sysparms', function(req, res, next) {
        /* Get System parameters */
        db.collection('admin').findOne({"_id":"admin"},{},function (err, doc) {
            assert.equal(null, err);
            var currentRound = doc.currentRound;
            var currentMonth = doc.currentMonth;
            console.log("Retrieved defaults - ", doc);
            res.send(doc)
        });
    });

    app.get('/api/list_users', function(req, res, next) {
      console.log("api/list_user input parms: ", req.params);
      db.collection('users').find({}).toArray(function (err, docs) {
            assert.equal(null, err);
            /* res.render('list_users',{users : docs});*/
            console.log("api/list_user result: ", docs);
            res.send(docs)
        });
    });

    app.get('/api/get_user/:email', function(req, res, next) {

      console.log("api/get_user input parms: ", req.params);

      var email = req.params.email;

      db.collection('users').find({"_id" : email}).toArray(function (err, docs) {
            assert.equal(null, err);
            console.log("api/get_user result: ", docs);
            /* res.render('list_users',{users : docs});*/
            res.send(docs)
        });
    });

    app.get('/api/get_predictions/:email/:round', function(req, res, next) {
      console.log("This is the parms: ", req.params.email, " ", req.params.round);
      /* var user = req.body.user; */
      var email = req.params.email;
      var round = req.params.Round;
      db.collection('predictions').find({"email" : email, "Round": round}).toArray(function (err, docs) {
            assert.equal(null, err);
            console.log("Called get_predictions API");
            /* res.render('list_users',{users : docs});*/
            console.log(docs);
            res.send(docs)
        });
    });

    app.get('/api/get_table', function(req, res, next) {
      console.log("api/get_table input parms: ", req.params);
      db.collection('users').find({},{"_id" : 1, "name" : 1, "totalScore" : 1}).sort({"totalScore": -1}).toArray(function (err, docs) {
            assert.equal(null, err);
            /* res.render('list_users',{users : docs});*/
            console.log("api/get_table result: ", docs);
            res.send(docs)
        });
    });

/*    app.get('/api/populate_round', function(req, res, next) {
      db.collection('admin').findOne({"_id":"admin"},{},function (err, doc) {
          assert.equal(null, err);
          var currentRound = doc.currentRound;
          var currentMonth = doc.currentMonth;
          console.log("Retrieved defaults - round = ", currentRound, " month = ", currentMonth );

          var nextRound = currentRound + 1;
          db.collection('fixtures').find({Round : nextRound}).toArray(function (err, docs) {
              assert.equal(null, err);
              console.log(docs);
              res.render('populate_round',{games : docs, round : nextRound});
          });
      });
    });

    app.get('/api/add_user', function(req, res, next) {
        res.render('add_user',{});
    });

    app.post('/api/add_user', function(req, res, next) {
        var name = req.body.name;
        var email = req.body.email;

        if (name == '' || email == '') {
          console.log("Please enter all fields before hitting Submit");
        }

        else {
          console.log("Storing user ", name, " with email/ID ", email);
          db.collection('users').insertOne({
              "_id": email,
              "name" : name,
              "jokersRemaining" : 38,
              "totalScore" : 0,
              "weeklyScore" : [0],
              "monthlyScore" : [0]
            }, function (err, r) {
                assert.equal(null, err);
                message = "User inserted with ID " + r.insertedId
                res.render("add_user", {message: message});
            });
        }
    });

    app.get('/api/add_prediction', function(req, res, next) {
        res.render('add_prediction',
        {
          name: "David Koppe",
          email: "wolvesdave@gmail.com",
          games:
            [
              {homeTeam : "Wolves", homeScore : 2, awayTeam : "Albion", awayScore : 0, "joker" : false},
              {homeTeam : "Man U", homeScore : 1, awayTeam : "Arsenal", awayScore : 2, "joker" : false},
              {homeTeam : "Leicester", homeScore : 0, awayTeam : "Villa", awayScore : 4, "joker" : true}
            ]
        }
        );
    });

    app.post('/api/add_prediction', function(req, res, next) {
        var body = req.body;
        console.log(body, body.homeTeam.length);
        var predictions = [];
        for (var i = 0; i < body.homeTeam.length; i++) {
          console.log("Adding prediction number ", i);
          predictions[i] = {email : body.email, name : body.name, homeTeam : body.homeTeam[i], homeScore : body.homeScore[i], awayTeam : body.awayTeam[i], awayScore : body.awayScore[i]}
          console.log("Prediction added: ", predictions[i]);
        };
        console.log("About to insert predictions: ", predictions);
        db.collection('predictions').insertMany(predictions, function(err, r) {
          assert.equal(null, err);
          var message = "predictions inserted with result: " + r;
          console.log(message);
          res.render("add_prediction", {message: message});
        });
    }); */

    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
