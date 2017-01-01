#  Prediction League Playground.py
#  
#
#  Created by David Koppe on 8/9/16.
#
import pymongo
import sys
from xmljson import parker
# from xml.etree.ElementTree import fromstring
from xml.etree import ElementTree as ET
from xml.etree.ElementTree import fromstring
from json import dumps
from lxml import objectify
from json import dumps
import requests
import datetime

url = 'http://www.xmlsoccer.com/FootballDataDemo.asmx/GetFixturesByLeagueAndSeason'
payload = {'ApiKey':'QQQMPBBYBPJYCVJCBHFRQMFVOCOSLBPPCXVGWLRKRRKAEACUXC', 'seasonDateString':'1617', 'league':'Scottish Premier League'}

# Pull fixtures from xml soccer url

r = requests.post(url, data=payload)
print r.content
print r.status_code
matches = ET.fromstring(r.text)

# Load fixtures from saved file
# matches = ET.parse('xmlsoccer.xml')

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")

# get a handle to the fixtures collection
db=connection.predictionleague
fixtures = db.fixtures

good_elements = ['Id', 'Round', 'HomeTeam_Id', 'AwayTeam_Id', 'HomeGoals', 'AwayGoals', 'League', 'HomeTeam', 'AwayTeam', 'Location', 'Date']

for match in matches.findall('Match'):
    
    match_json = dict()
    for item in match.iter():

        if str(item.tag) in good_elements:
            
            if type(item.text) == str:
                print str(item.tag), 'is a string'
                if str(item.tag) == 'Id':
                    match_json.update({'_id': item.text})
            
                else:
                    match_json.update({item.tag: item.text})
            
            elif type(item.text) == int:
                match_json.update({item.tag: item.text})
            
            elif type(item.text) == datetime.datetime:
    
    #                matchdatetime = datetime.datetime.strptime(item.text.split('+',1)[0], '%Y-%m-%dT%H:%M:%S')
                match_json.update({item.tag: datetime.datetime.strptime(item.text.split('+',1)[0], '%Y-%m-%dT%H:%M:%S')})

#    print match_json

    fixtures.insert(match_json)


