var mongoose = require('mongoose');

var schema = new mongoose.Schema({
        _id: String,
        "league" : { type : String,  trim: true },
        "homeTeam_Id" : Number,
        "homeTeam" : { type : String,  trim: true },
        "awayGoals" : Number,
        "awayTeam_Id" : Number,
        "awayTeam" : { type : String,  trim: true },
        "homeGoals" : Number,
        "location" : { type : String,  trim: true },
        "matchDate" : Date,
        "round" : Number,
        "currentRound" : Boolean
    }
    );

      module.exports = mongoose.model('Fixtures',schema);
