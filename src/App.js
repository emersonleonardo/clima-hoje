import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }  
    });
    setWeather(res.data);
    console.log(res.data)
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day} | ${date} ${month}`;
  }

  if(location === false){
    return (
      <div className={`app`}>
        Você precisa habilitar a localização no browser o/
      </div>
    )
  } else if (weather === false) {
    return (
      <div className={`app`}>
        Carregando o clima...
      </div>
    )
  } else{
    return (
      <div className={`app`}>
        <div className="background"></div>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Ex.: São Paulo"
            />
          </div>
          <p className="temp">{ Math.round(weather['main']['temp']) }°</p>
          <div className="footer">
            <h3 className="location">{weather['name']}/{weather['sys']['country']}</h3>
            <p className="today">{dateBuilder(new Date())}</p>
            <p className="temp-min-max">{ Math.round(weather['main']['temp_min']) }° / { Math.round(weather['main']['temp_max']) }°</p>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
