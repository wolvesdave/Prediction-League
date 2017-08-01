
var mongoose = require('mongoose');
var Fixtures = require('../models/Fixtures');
var Users = require('../models/Users');
var Predictions = require('../models/Predictions');
var faker = require('faker');
/* var dotenv = require('dotenv'); */
const chalk = require('chalk');
mongoose.Promise = global.Promise;
require('events').EventEmitter.prototype._maxListeners = 100;

/* dotenv.load({ path: '.env.example' }); */

mongoose.connect('mongodb://localhost/predictionleague');
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

var users = ['wolvesdave@gmail.com','SPfister@hotmail.com','IFulton@gmail.com'];
var teams = ["Partick","Celtic","Hamilton","Motherwell","Aberdeen","Dundee FC","St Johnstone","Hearts","Rangers","Ross County","Kilmarnock","Inverness C"];

for (var r=0; r < 10; r++) {

  for (user in users) {
      console.log('processing user: ', users[user])
      var done = 0;
      var userEmail = users[user];
      var Round =r;

      for (var i=0; i < 6; i++) {
          var HomeTeam = teams[faker.random.number({min:0, max:11})];
          var AwayTeam = teams[faker.random.number({min:0, max:11})];
          var HomeGoals = faker.random.number({min:0, max:5});
          var AwayGoals = faker.random.number({min:0, max:5});

      	prediction = new Predictions({
            homeTeam : HomeTeam,
            awayTeam : AwayTeam,
            homeGoals : HomeGoals,
            awayGoals : AwayGoals,
            userEmail : userEmail,
            round : Round,
        });

      	prediction.save(function(err) {
      		if (err) {
      			console.log('error: ',err.message);
      		}
      	});
      	done++;
      	if (done==10) {
      		exit();
      	}
      }
  }
}
function exit() {
	mongoose.disconnect();
}
