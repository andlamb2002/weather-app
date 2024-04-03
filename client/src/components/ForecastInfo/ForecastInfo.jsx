import React from 'react'

function ForecastInfo(props) {
  
    const renderForecast = (data) => (
        <div>
          {Object.entries(data.dailyForecasts).map(([date, dailyInfo], index) => (
            <div key={index}>
              <h3>Daily Forecast for {date}</h3>
              <p>High: {dailyInfo.highTemp}°C, Low: {dailyInfo.lowTemp}°C, Precipitation: {dailyInfo.hasPrecipitation ? 'Yes' : 'No'}</p>
              <ul>
                {data.detailedForecast
                  .filter(forecast => {
                    const forecastDate = forecast.dt_txt.split(' ')[0];
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

    return (
        <div className="forecast-info">
            {props.forecastData ? renderForecast(props.forecastData) : 'Loading Forecast...'}
        </div>
    );
}

export default ForecastInfo;