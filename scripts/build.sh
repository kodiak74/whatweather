#!/bin/bash

# Validate codebase
pylint --output-format=parseable ../app/main.py ../app/weather_services

# Unit Test
python3 -m unittest discover -s ../app -v
[ $? -eq 0 ]  || exit 1

#Build the ReactJS app
cd ../ui
yarn build
cd -

#Build the Docker image
image="whatweather"
docker build  -t ${image}:latest ..