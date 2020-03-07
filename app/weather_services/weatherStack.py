''' Functions to interact with the WeatherStack service to get the weather'''
import os
import urllib.request
import json
from datetime import datetime
 
BASE_URL = 'http://api.weatherstack.com/current?access_key='
last_result = None
last_ts = None
is_up = False

def fetch_weather(location=None):
    """Perform the retrieval of the weather - default location is Melbourne, AUS"""
    global is_up, last_result, last_ts
    if location is None: 
        location = "Melbourne,Victoria,Australia"
    api_key = os.getenv('WEATHERSTACK_API_KEY')
    if api_key is None:
        print("WeatherStack API key not specified. Try 'export WEATHERSTACK_API_KEY=<Your Key>'")
        return None
    url = BASE_URL + api_key + '&units=m&query=' + location  
    try:
        response = urllib.request.urlopen(url).read() 
        is_up = True
    except:
        #Dont care about the type of error - at this point
        is_up = False
        return None
    src = json.loads(response) 
    if not "current" in src:
        is_up = False
        return None
    result = {
        'source' : 'WeatherStack',
        'location': {
            'name': src['location']['name'],
            'country' : src['location']['country'],
            'lat': src['location']['lat'],
            'lon': src['location']['lon'],
            },
        'temperature' : src['current']['temperature'],
        'humidity': src['current']['humidity'],
        'wind' : {
            'speed' : src['current']['wind_speed'],
            'deg' : src['current']['wind_degree'] 
        },
        'cloud' : src['current']['cloudcover'],
        'pressure' : src['current']['pressure'],
    }
    last_result = result
    last_ts = datetime.now()
        
    return result
    