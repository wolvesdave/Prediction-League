    var mongoose = require('mongoose');

    var schema = new mongoose.Schema({
            "userName" : { type : String,  trim: true },
            "userEmail" : { type : String,  trim: true, lowercase: true },
            "jokersRemaining": Number,
            "totalScore" : Number,
            "monthlyScore" : [Number],
            "weeklyScore": [Number]
        }
      );

      module.exports = mongoose.model('User',schema);
