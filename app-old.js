var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/getprediction', function(req, res){
    res.send('Get Prediction');
});

app.get('/viewscores', function(req, res){
    res.send('View Scores');
});

app.get('/viewtable', function(req, res){
    res.send('View Table');
});

app.get('/', function(req, res){
    res.send('Page Not Found',404);
});

app.use(function(req, res){
    res.sendStatus(404);
});

app.post('/putprediction', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next('Please choose a fruit!');
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
