    var mongoose = require('mongoose');

    var schema = new mongoose.Schema({
            "userName" : { type : String,  trim: true },
            "userEmail" : { type : String,  trim: true, lowercase: true },
            "TotalScore" : Number,
            "MonthlyScore" : [Number],
            "WeeklyScore": [Number],
        }
      );

      module.exports = mongoose.model('User',schema);
