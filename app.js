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

    app.get('/', function(req, res, next) {
        res.render('index',{});
    });

    app.get('/list_users', function(req, res, next) {
      db.collection('users').find({}).toArray(function (err, docs) {
            assert.equal(null, err);
            res.render('list_users',{users : docs});
        });
    });

    app.get('/add_user', function(req, res, next) {
        res.render('add_user',{});
    });

    app.post('/add_user', function(req, res, next) {
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
                res.render("add_user_confirm", {message : r.insertedId});
            });
        }
    });

    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
