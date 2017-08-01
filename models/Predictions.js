    var mongoose = require('mongoose');

    var schema = new mongoose.Schema({
          "userEmail" : { type : String,  trim: true, lowercase: true },
          "round" : String,
          "homeTeam_Id" : Number,
          "homeTeam" : { type : String,  trim: true },
          "awayGoals" : Number,
          "awayTeam_Id" : Number,
          "awayTeam" : { type : String,  trim: true },
          "homeGoals" : Number,
          "matchDate" : Date
        }
      );

      module.exports = mongoose.model('Prediction',schema);
