    var mongoose = require('mongoose');
      
    var schema = new mongoose.Schema({
          "userEmail" : { type : String,  trim: true, lowercase: true },
          "Round" : Number,
          "HomeTeam_Id" : Number,
          "HomeTeam" : { type : String,  trim: true },
          "AwayGoals" : Number,
          "AwayTeam_Id" : Number,
          "AwayTeam" : { type : String,  trim: true },
          "HomeGoals" : Number,
          "MatchDate" : Date
        }
      );

      module.exports = mongoose.model('Prediction',schema);
