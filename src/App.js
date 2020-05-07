import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './components/Weather';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getPosition(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  let getPosition = async (lat, long) => {
    await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    .then(function (res){
      setWeather(res.data);
    })
  }

  let getSearchValue = async (e) => {
    if(e.key === 'Enter') {
      await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: e.target.value,
          appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
          lang: 'pt',
          units: 'metric'
        }
      })
      .then(function(res){
        setWeather(res.data);
      })
      .catch(function(error){
        alert('Cidade não encontrada, tente novamente')
      })
    }    
  }

  let dt = new Date();
  let time = dt.getHours();
  if(hour => 6 && hour <= 18) {
    time = 'app morning'
  } else {
    time = 'app night'
  }

  console.log(time)

  if (location === false) {
    return (
      <div className={time}>
        Você precisa habilitar a localização no browser o/
      </div>
    )
  } else if (weather === false) {
    return (
      <div className={time}>
        Carregando o clima...
      </div>
    )
  } else {
    return (
      <div className={time}>
        <div className="background"></div>
        <main>
          <div className = "search-box">
            <input 
              type = "text"
              className = "search-bar"
              placeholder = "Ex.: São Paulo"
              onKeyPress = {getSearchValue}
            />          
          </div>
          <Weather weather = {weather}/>
        </main>
      </div>
    );
  }
}

export default App;
