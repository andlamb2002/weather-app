import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function Dropdown(props) { 
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mb-2 w-4/5 mx-auto text-text">
      <div
        className="flex justify-between items-center bg-orange rounded p-4 cursor-pointer hover:bg-orangeHover"
        onClick={() => setIsOpen(!isOpen)}
        >
        <div className="text-2xl">{formatDate(props.date)}</div>
        <div className="flex items-center text-2xl">
            <span>{Math.round(props.highLow.high)}°</span> / <span className="pr-2">{Math.round(props.highLow.low)}°</span>
            {isOpen ? (
            <MdExpandLess className="text-xl" />
            ) : (
            <MdExpandMore className="text-xl" />
            )}
        </div>
      </div>

      {isOpen && (
        <ul className="text-xl mx-auto w-11/12">
          {props.forecasts.map((forecast, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2"
            >
              <div>{formatTime(forecast.dt)}</div>
              <div className="flex items-center gap-2 capitalize">
                <span>{forecast.weather[0].description}</span>
                <img 
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                    alt="Weather icon" 
                    className="bg-darkBg" 
                />
                <span>{Math.round(forecast.main.temp)}°</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
