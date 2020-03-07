import React from 'react';
 
import './App.css';
import Weather from './components/Weather'
import { WiDaySunny } from "weather-icons-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>
        <WiDaySunny size={64} color='#FFF' />
          WhatWeather
        </h1>
        
      </header>
      <Weather/>
    </div>
  );
}

export default App;
