# Weather

## Overview

Weather is a sample project that consists of a Python Flask webservice to provide a redundant source of weather information, using OpenWeatherStack and WeatherStack as the backend datasources. To run the application you will need to signup for API keys for both services.
This also includes a ReactJS frontend for the service, as well as scripting to build and deploy as a Docker container, as an example of a CI/CD integration piece.


## Running the code

1) Configure your API keys:

```
$ export WEATHERSTACK_API_KEY=<Your Key>
$ export OPENWEATHERMAP_API_KEY=<Your Key>

```


2) You can run the server standalone with:

```
/weather/app$ python3 main.py

```

or you can build and run through Docker:

```
/weather/scripts$ ./build.sh

# And if build successful

/weather/scripts$ ./run.sh

```


To "stress test" the application, and see the failover in action, try:
* running it locally without setting the API keys in your environment
* using your hosts file to re-route the webservice URLS to you localhost (ie take the service offline)
* disconnect your network connection




# Resources

Fonts & Icons:
* https://websygen.github.io/owfont/
* https://najens.github.io/weather-icons-react/
 
Other tutorials:
* https://medium.com/@leizl.samano/how-to-make-a-weather-app-using-react-403c88252deb
 





