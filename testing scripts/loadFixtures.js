
var mongoose = require('mongoose');
var Fixture = require('../models/Fixture');
var User = require('../models/User');
var Prediction = require('../models/Prediction');

var faker = require('faker');
/* var dotenv = require('dotenv'); */
const chalk = require('chalk'); 
mongoose.Promise = global.Promise;

/* dotenv.load({ path: '.env.example' }); */

mongoose.connect('mongodb://localhost/predictionleague');
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

var fixture = new Fixture(
        { "_id" : 1,
        "League" : "Scottish Premier League",
        "HomeTeam_Id" : 10,
        "HomeTeam" : "Rangers",
        "AwayGoals" : 2,
        "AwayTeam_Id" : 20,
        "AwayTeam" : "Celtic",
        "HomeGoals" : 1,
        "Location" : "Ibrox Stadium",
        "Date" : 10/8/2016,
        "Round" : 1}
      );    
    
fixture.save(function(err) {
	if (err) {
		console.log('error: ',err.message);
	}
});
	
function exit() {
	mongoose.disconnect();
}
