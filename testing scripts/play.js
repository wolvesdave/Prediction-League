var MongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    assert = require('assert'),
    parseString = require('xml2js').parseString,
    request = require('request'),
    http = require('http');

http.post = require('http-post');

    payload = {
      'ApiKey':'QQQMPBBYBPJYCVJCBHFRQMFVOCOSLBPPCXVGWLRKRRKAEACUXC',
      'seasonDateString':'1718',
      'league':'Scottish Premier League'
    }

http.post('http://www.xmlsoccer.com/FootballDataDemo.asmx/GetFixturesByLeagueAndSeason',
payload, function(res){
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		console.log(chunk);
	});
});
