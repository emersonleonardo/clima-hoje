import React from 'react';

export default function Weather(props) {

    let d = new Date();
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const date = {
        day: days[d.getDay()],
        date: d.getDate(),
        month: months[d.getMonth()]
    }
    const weather = {
        temp: Math.round(props.weather.main.temp),
        city: props.weather.name,
        country: props.weather.sys.country,
        tempMax: Math.round(props.weather.main.temp_max),
        tempMin: Math.round(props.weather.main.temp_min)
    }

    return(
        <>
            <p className="temp">{weather.temp}°</p>
            <div className="footer">
                <h3 className="location">{weather.city}/{weather.country}</h3>
                <p className="today">{date.day} | {date.date} {date.month}</p>
                <p className="temp-min-max">{weather.tempMin}° / {weather.tempMax}°</p>
            </div>
        </>
    );
}