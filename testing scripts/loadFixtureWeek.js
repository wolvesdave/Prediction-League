var MongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    assert = require('assert'),
    parseString = require('xml2js').parseString,
    request = require('request'),
    http = require('http'),
    post = require('http-post'),
    fixtureData = '';

    payload = {
      'ApiKey':'QQQMPBBYBPJYCVJCBHFRQMFVOCOSLBPPCXVGWLRKRRKAEACUXC',
      'seasonDateString':'1718',
      'league':'Scottish Premier League',
      'startDateString': '2017-12-01',
      'endDateString' : '2017-12-31'
    };

MongoClient.connect('mongodb://localhost:27017/predictionleague', function(err, db) {

  post('http://www.xmlsoccer.com/FootballDataDemo.asmx/GetFixturesByDateIntervalAndLeague',
  payload, function(res){

      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

      res.on('data', function(chunk) {

        console.log("Adding a chunk... ");
        fixtureData+= chunk;

      });

      res.on('end',function(){

        parseString(fixtureData, function (err, result) {

          if(err) {
              console.log('Unknown Error');
              return;
            }

            var inputmatches = result["XMLSOCCER.COM"].Match,
                outputmatches = [];

            console.log(inputmatches.length);

             for (var i = 0, len = inputmatches.length; i < len; i++) {
              /* console.log("Mapping match ID ", inputmatches[i].Id[0]); */
              if (inputmatches[i].HomeGoals !== undefined) {
                homegoals = parseInt(inputmatches[i].HomeGoals[0])
              } else {
                homegoals = ""
              }
              if (inputmatches[i].AwayGoals !== undefined) {
                awaygoals = parseInt(inputmatches[i].AwayGoals[0])
              } else {
                awaygoals = ""
              }
              match = {
                "_id" : inputmatches[i].Id[0],
                "Round" : parseInt(inputmatches[i].Round[0]),
                "Date" : inputmatches[i].Date[0],
                "HomeTeam" : inputmatches[i].HomeTeam[0],
                "HomeGoals" : homegoals,
                "AwayTeam" : inputmatches[i].AwayTeam[0],
                "AwayGoals" : awaygoals,
                "Location" : inputmatches[i].Location[0]
              }
              outputmatches.push(match);
            };

            /* console.log(outputmatches); */

            db.collection('fixtures').insertMany(outputmatches, function(err, r) {

              assert.equal(null, err);
              console.log('Fixtures inserted with result ', r);

            });


        });

      });

  });

});