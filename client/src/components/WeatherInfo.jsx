import React from 'react'

function WeatherInfo(props) {

    const renderWeather = (data, retrievalDate) => (

    
      <div className="flex justify-center items-center py-4">
        <div className="bg-darkBg rounded w-[640px] px-8 py-4 text-white">
          <h1 className="text-4xl mb-4">Today's Weather in {data.name}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-9xl">{Math.round(data.main.temp)}°</p>
              <p className="text-xl">Feels like {Math.round(data.main.feels_like)}°</p>
              <div className="flex flex-col py-4 gap-3">
                <p className="text-3xl">Humidity: {data.main.humidity}%</p>
                <p className="text-3xl">Pressure: {data.main.pressure} hPa</p>
                <p className="text-3xl">Wind: {data.wind.speed} m/s</p>
              </div>
            </div>
            <div className="text-left flex flex-col">
              <div className="flex-grow">
                {data.weather[0].icon && (
                  <img className="inline-block" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="Weather Icon" />
                )}
                <p className="text-4xl capitalize">{data.weather[0].description}</p>
              </div>
              <div className="text-xl text-right">
                <p>Retrieved {retrievalDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  
    return (
      <div>
        {props.weatherData ? renderWeather(props.weatherData, props.retrievalDate) : 'Loading Weather...'}
      </div>
    );
  }

export default WeatherInfo;