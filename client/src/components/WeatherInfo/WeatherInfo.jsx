import React from 'react'

function WeatherInfo(props) {

    const renderWeather = (data, retrievalDate) => (
        <div>
          <h1>Today's Weather in {data.name}</h1>
          <p><strong>Temperature:</strong> {data.main.temp}°C (feels like {data.main.feels_like}°C)</p>
          {/* <p><strong>Minimum Temperature:</strong> {data.main.temp_min}°C</p>
          <p><strong>Maximum Temperature:</strong> {data.main.temp_max}°C</p> */}
          <p><strong>Conditions:</strong> {data.weather[0].description}</p>
          {data.weather[0].icon && (
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" />
          )}
          <p><strong>Humidity:</strong> {data.main.humidity}%</p>
          <p><strong>Pressure:</strong> {data.main.pressure} hPa</p>
          {/* <p><strong>Visibility:</strong> {data.visibility / 1000} km</p> */}
          <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
          <p><strong>Date of Retrieval:</strong> {retrievalDate}</p>
        </div>
      );
  
    return (
      <div>
        {props.weatherData ? renderWeather(props.weatherData, props.retrievalDate) : 'Loading Weather...'}
      </div>
    );
  }

export default WeatherInfo;