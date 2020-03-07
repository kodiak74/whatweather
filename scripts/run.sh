#!/bin/bash
# -p hostPort:containerPort
docker run -d -p 5000:5000 -p 9080:80 whatweather:latest
open -a "Google Chrome"  http://127.0.0.1:5000/weather
open -a "Google Chrome"  http://127.0.0.1:9080/