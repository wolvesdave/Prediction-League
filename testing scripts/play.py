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
#from httplib2 import Http
#from urllib import urlencode
import requests


def _flatten_attributes(property_name, lookup, attributes):
    if attributes is None:
        return lookup
    
    if not isinstance(lookup, dict):
        return dict(attributes.items() + [(property_name, lookup)])
    
    return dict(lookup.items() + attributes.items())


def _xml_element_to_json(xml_element, attributes):
    if isinstance(xml_element, objectify.BoolElement):
        return _flatten_attributes(xml_element.tag, bool(xml_element), attributes)
    
    if isinstance(xml_element, objectify.IntElement):
        return _flatten_attributes(xml_element.tag, int(xml_element), attributes)
    
    if isinstance(xml_element, objectify.FloatElement):
        return _flatten_attributes(xml_element.tag, float(xml_element), attributes)
    
    if isinstance(xml_element, objectify.StringElement):
        return _flatten_attributes(xml_element.tag, str(xml_element).strip(), attributes)
    
    return _flatten_attributes(xml_element.tag, _xml_to_json(xml_element.getchildren()), attributes)


def _xml_to_json(xml_object):
    attributes = None
    if hasattr(xml_object, "attrib") and not xml_object.attrib == {}:
        attributes = xml_object.attrib
    
    if isinstance(xml_object, objectify.ObjectifiedElement):
        return _xml_element_to_json(xml_object, attributes)

    if isinstance(xml_object, list):
        if len(xml_object) > 1 and all(xml_object[0].tag == item.tag for item in xml_object):
            return [_xml_to_json(attr) for attr in xml_object]
        
        return dict([(item.tag, _xml_to_json(item)) for item in xml_object])

    return Exception("Not a valid lxml object")


def xml_to_json(xml):
    xml_object = xml if isinstance(xml, objectify.ObjectifiedElement) \
        else objectify.fromstring(xml)
    return dumps({xml_object.tag: _xml_to_json(xml_object)})



url = 'http://www.xmlsoccer.com/FootballDataDemo.asmx/GetFixturesByLeagueAndSeason'
payload = {'ApiKey':'QQQMPBBYBPJYCVJCBHFRQMFVOCOSLBPPCXVGWLRKRRKAEACUXC', 'seasonDateString':'1617', 'league':'Scottish Premier League'}

# POST with form-encoded data
# r = requests.post(url, data=payload)
# print r.content
# matches = ET.fromstring(r.text)
matches = ET.parse('xmlsoccer.xml')
# print r.status_code
# print(xml_to_json(r.content))

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://192.168.56.10")

# get a handle to the students database
db=connection.predictionleague
schedule = db.schedule

good_elements = ['Id', 'Date', 'League', 'Round', 'HomeTeam', 'HomeTeam_Id', 'AwayTeam', 'AwayTeam_Id', 'HomeGoals', 'AwayGoals', 'Location']

for match in matches.findall('Match'):
    
    match_json = dict()
    for item in match.iter():

        if str(item.tag) in good_elements:
            match_json.update({item.tag: item.text})

    print match_json

    schedule.insert(match_json)


