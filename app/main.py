""" 
Core server for running Weather service. 
Will run on 127.0.0.1 by default, can be overridden by 
setting FLASK_HOST environment variable.

To run:
$ python3 main.py

"""
import os
from flask import Flask, escape, request
from weather_services import weatherStack
from weather_services import openWeatherMap
from flask_cors import CORS

def lookupWeather(location):
    ''' Perform the lookup of weather information across our two services '''
    weather = weatherStack.fetch_weather(location)
    if (not weatherStack.is_up):
        weather = openWeatherMap.fetch_weather(location)
        if (not openWeatherMap.is_up):
            if (weatherStack.last_ts is None):
                weather = None
            else:    
                if (openWeatherMap.last_ts is None):
                    weather = weatherStack.last_result
                else:     
                    #Get the latest cached
                    if (openWeatherMap.last_ts > weatherStack.last_ts):
                        weather = openWeatherMap.last_result
                    else:
                        weather = weatherStack.last_result    
    if (weather is None): weather = {'status':'Offline'}                   
    return weather 

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    """ Demo web service """
    return f'WhatWeather Server v1.0'

@app.route('/weather')
def getWeather():
    """ Weather web service """
    location = request.args.get("location", None)
    return lookupWeather(location)


def main():
    """Main entry point for server"""
    hostname = os.getenv('FLASK_HOST')
    hostname = '127.0.0.1' if hostname is None else hostname
    print('Running on %s'%(hostname))
    app.run(host=hostname)

if __name__ == "__main__":
    main()
