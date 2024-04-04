import React from 'react';
import Dropdown from './Dropdown';

function ForecastInfo(props) {
  const renderForecast = (data) => {
    return Object.entries(data.dailyForecasts).map(([date, dailyInfo], index) => {
      const detailedForecast = data.detailedForecast.filter(forecast => {
        const forecastDate = forecast.dt_txt.split(' ')[0];
        return forecastDate === date;
      });

      return (
        <Dropdown
          key={index}
          date={date}
          highLow={{ high: dailyInfo.highTemp, low: dailyInfo.lowTemp }}
          forecasts={detailedForecast}
        />
      );
    });
  };

  return (
    <div className="forecast-info">
      {props.forecastData ? renderForecast(props.forecastData) : 'Loading Forecast...'}
    </div>
  );
}

export default ForecastInfo;