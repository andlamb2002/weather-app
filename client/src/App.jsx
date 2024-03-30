import React, { useEffect, useState } from 'react'

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [retrievalDate, setRetrievalDate] = useState('');

  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeatherData(data);
        setRetrievalDate(new Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const renderWeather = (data) => (
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

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch('/api/forecast');
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }
  , []);

  const renderForecast = (data) => (
      <div>
        {Object.entries(data.dailyForecasts).map(([date, dailyInfo], index) => (
          <div key={index}>
            <h3>Daily Forecast for {date}</h3>
            <p>High: {dailyInfo.highTemp}°C, Low: {dailyInfo.lowTemp}°C, Precipitation: {dailyInfo.hasPrecipitation ? 'Yes' : 'No'}</p>
            <ul>
              {data.detailedForecast
                .filter(forecast => {
                  const utcDate = new Date(forecast.dt * 1000);
                  const estDate = new Date(utcDate.getTime() - (5 * 60 * 60 * 1000));
                  const forecastDate = estDate.toISOString().split('T')[0];
                  return forecastDate === date;
                })
                .map((forecast, index) => (
                  <li key={index}>
                    Time: {new Date(forecast.dt * 1000).toLocaleTimeString()}
                    <ul>
                      <li>Temperature: {forecast.main.temp}°C</li>
                      <li>Description: {forecast.weather[0].description}</li>
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );

  console.log(forecastData);

  return (
    <div>
      {weatherData ? renderWeather(weatherData) : 'Loading Weather...'}
      {forecastData ? renderForecast(forecastData) : 'Loading Forecast...'}
    </div>
  )
}

export default App