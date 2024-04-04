import React, { useState } from 'react';

function Dropdown(props) { 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <div
        className="flex justify-between items-center bg-orange p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-bold">{props.date}</div>
        <div>
          <span className="font-bold">{props.highLow.high}°</span> / <span className="font-bold">{props.highLow.low}°</span>
          {isOpen ? (
            <span className="material-icons">expand_less</span>
          ) : (
            <span className="material-icons">expand_more</span>
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="bg-orange-100 border border-t-0 border-orange-200">
          {props.forecasts.map((forecast, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b border-orange-200 last:border-b-0"
            >
              <div>{new Date(forecast.dt * 1000).toLocaleTimeString()}</div>
              <div className="flex items-center">
                <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Weather icon" />
                <span>{forecast.main.temp}°</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
