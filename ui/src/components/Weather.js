import React from 'react';
import { WiDirectionUp, WiDirectionUpRight, WiDirectionRight, WiDirectionDownRight, WiDirectionDown, WiDirectionDownLeft, WiDirectionLeft, WiDirectionUpLeft } from "weather-icons-react";
import { WiWindBeaufort0, WiWindBeaufort1, WiWindBeaufort2, WiWindBeaufort3, WiWindBeaufort4, WiWindBeaufort5, WiWindBeaufort6, WiWindBeaufort7, WiWindBeaufort8, WiWindBeaufort9, WiWindBeaufort10 } from "weather-icons-react";
import { WiThermometer, WiBarometer, WiCloud, WiStrongWind, WiHumidity} from "weather-icons-react";
import LocationSetter from './LocationSetter'

class Weather extends React.Component {

  constructor() {
    super();
    this.state = {
      weather: null,
    };
    this.getWeather = this.getWeather.bind(this);  
  }


  getWindDirectionIcon(direction) {
    if ((direction > 337.5) && (direction <= 360)) return (<WiDirectionDown size={64} color='#000' />)
    if ((direction >= 0) && (direction < 22.5)) return (<WiDirectionDown size={64} color='#000' />)
    if ((direction > 22.5) && (direction < 67.5)) return (<WiDirectionDownLeft size={64} color='#000' />)
    if ((direction > 67.5) && (direction < 112.5)) return (<WiDirectionLeft size={64} color='#000' />)
    if ((direction > 112.5) && (direction < 157.5)) return (<WiDirectionUpLeft size={64} color='#000' />)
    if ((direction > 157.5) && (direction < 202.5)) return (<WiDirectionUp size={64} color='#000' />)
    if ((direction > 202.5) && (direction < 247.5)) return (<WiDirectionUpRight size={64} color='#000' />)
    if ((direction > 247.5) && (direction < 292.5)) return (<WiDirectionRight size={64} color='#000' />)
    if ((direction > 292.5) && (direction < 337.5)) return (<WiDirectionDownRight size={64} color='#000' />)
  }

  getWindSpeedIcon(speed) {
    if ((speed >= 0) && (speed < 2)) return (<WiWindBeaufort0 size={64} color='#000' />)
    if ((speed >= 2) && (speed < 7)) return (<WiWindBeaufort1 size={64} color='#000' />)
    if ((speed >= 7) && (speed < 13)) return (<WiWindBeaufort2 size={64} color='#000' />)
    if ((speed >= 13) && (speed < 20)) return (<WiWindBeaufort3 size={64} color='#000' title='Beaufort 3' />)
    if ((speed >= 20) && (speed < 30)) return (<WiWindBeaufort4 size={64} color='#000' />)
    if ((speed >= 30) && (speed < 41)) return (<WiWindBeaufort5 size={64} color='#000' />)
    if ((speed >= 41) && (speed < 52)) return (<WiWindBeaufort6 size={64} color='#000' />)
    if ((speed >= 52) && (speed < 63)) return (<WiWindBeaufort7 size={64} color='#000' />)
    if ((speed >= 63) && (speed < 76)) return (<WiWindBeaufort8 size={64} color='#000' />)
    if ((speed >= 76) && (speed < 89)) return (<WiWindBeaufort9 size={64} color='#000' />)
    if ((speed >= 89) && (speed < 104)) return (<WiWindBeaufort10 size={64} color='#000' />)

  }

  getWindDirectionCompass(direction) {
    if ((direction > 337.5) && (direction <= 360)) return "N"
    if ((direction >= 0) && (direction < 22.5)) return "N"
    if ((direction > 22.5) && (direction < 67.5)) return "NE"
    if ((direction > 67.5) && (direction < 112.5)) return "E"
    if ((direction > 112.5) && (direction < 157.5)) return "SE"
    if ((direction > 157.5) && (direction < 202.5)) return "S"
    if ((direction > 202.5) && (direction < 247.5)) return "SW"
    if ((direction > 247.5) && (direction < 292.5)) return "W"
    if ((direction > 292.5) && (direction < 337.5)) return "NW"
  }

  componentDidMount() {
    this.getWeather();
  };

   getWeather(location) {
    var weatherURL = `http://127.0.0.1:5000/weather`
    if ((location != undefined) && (location != "")) weatherURL = weatherURL + "?location="+ location;
    fetch(weatherURL)
      .then(res => {
        return res.json();
      }).then(data => {
        console.log(data);
        this.setState({ weather: data })
      })
   }


  render() {

    const weather = this.state.weather;

    if ((weather == undefined) || (weather.status == "Offline")) {
      return (
        <div className="col-sm-4 offset-md-4">
          <div className="card">
            <h3 className="card-title">Service offline.</h3>

          </div>
        </div>
      )
    } else {
      const lat = weather.location.lat;
      const lon = weather.location.lon;
      
      return (
        <div className="col-md-10 offset-md-1 p-4">
          <div className="card">
            <h3 className="card-title">
              <a href={"https://www.windy.com/?" + lat + "," + lon + ",10"} target="_blank">{weather.location.name}, {weather.location.country}</a>
            </h3>
           
            <LocationSetter onClick={this.getWeather}/>
            

           
            <div className="card-body">
              <div className="row p-2">
              <div className="border p-0 col-md-4 offset-md-4">
                  <p className="pt-3 pb-3 mb-0 bg-danger text-white"><WiThermometer size={32} /> Temperature</p>
                  <div className="card-text p-3"> <h2>{weather.temperature} °C</h2> </div>
                </div>
              </div>

              <div className="row p-2">
              <div className="border m-2 p-0 col-md-4 ">
                <p className="pt-3 pb-3 mb-2 bg-light "><WiStrongWind size={32}/> Wind</p>
                <div className="row p-3">
                  <div className="col-sm-6">
                    <p className="card-text">{this.getWindDirectionIcon(weather.wind.deg)} </p>
                    <p className="card-text">{weather.wind.deg}° {this.getWindDirectionCompass(weather.wind.deg)} </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="card-text">{this.getWindSpeedIcon(weather.wind.speed)} </p>
                    <p className="card-text">{weather.wind.speed}km/h   </p>

                  </div>
                </div>
              </div>
              <div className="border m-2 p-0 col-md-2">
                <p className="pt-3 pb-3 mb-2 bg-info text-white"><WiHumidity size={32}/> Humidity</p>
                <div className="card-text p-3"><h4>{weather.humidity}% </h4> </div>
              </div>
              <div className="border m-2 p-0 col-md-2">
                <p className="pt-3 pb-3 mb-2 bg-secondary text-white"><WiCloud size={32}/> Cloud</p>
                <div className="card-text p-3"><h4>{weather.cloud}% </h4> </div>
              </div>
              <div className="border m-2 p-0 col-md-2">  
                <p className="pt-3 pb-3 mb-2 bg-warning "><WiBarometer size={32}/> Pressure</p>
                <div className="card-text p-3"><h4>{weather.pressure} hPa </h4> </div>
              </div>
             
             </div>



            </div>
            <p className="text-small">Weather from: {weather.source}</p>
          </div>
        </div>
      )
    }


  };
}

export default Weather;