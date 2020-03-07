#Docker image specification for running a Python web service with Flask.

FROM python:3.7-buster

RUN apt-get update
RUN apt-get install -y nginx
COPY ui/build /var/www/html


COPY app /app
WORKDIR /app
RUN pip3 install -r requirements.txt
ENV FLASK_HOST=0.0.0.0
ENV OPENWEATHERMAP_API_KEY=<Your Key Here>
ENV WEATHERSTACK_API_KEY=<Your Key Here>

CMD nginx && python3 main.py

 