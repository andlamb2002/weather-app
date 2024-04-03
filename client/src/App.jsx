import React, { useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import ForecastInfo from './components/ForecastInfo';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [retrievalDate, setRetrievalDate] = useState('');

  const [forecastData, setForecastData] = useState(null);

  const city = "Charlotte";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`/api/weather?location=${city}`);
        setWeatherData(response.data);
        setRetrievalDate(new Date().toLocaleString());
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    fetchWeather();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(`/api/forecast?location=${city}`);
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, []);

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar />} /> 
        <Route 
          path="/weather/:lat/:lon" 
          element={
          <>
            <WeatherInfo weatherData={weatherData} retrievalDate={retrievalDate} />
            <ForecastInfo forecastData={forecastData} />
          </>
        } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App