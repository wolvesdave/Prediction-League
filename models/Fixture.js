var mongoose = require('mongoose');

var schema = new mongoose.Schema({
        _id: Number,
        "League" : { type : String,  trim: true },
        "HomeTeam_Id" : Number,
        "HomeTeam" : { type : String,  trim: true },
        "AwayGoals" : Number,
        "AwayTeam_Id" : Number,
        "AwayTeam" : { type : String,  trim: true },
        "HomeGoals" : Number,
        "Location" : { type : String,  trim: true },
        "MatchDate" : Date,
        "Round" : Number
    }
    );

      module.exports = mongoose.model('Fixture',schema);   
