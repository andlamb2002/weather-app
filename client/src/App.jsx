import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import ForecastInfo from './components/ForecastInfo';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [retrievalDate, setRetrievalDate] = useState('');

  const [forecastData, setForecastData] = useState(null);

  const fetchData = async (lat, lng) => {
    try {
      const weatherResponse = await axios.get(`/api/weatherByCoordinates?lat=${lat}&lng=${lng}`);
      setWeatherData(weatherResponse.data.currentWeather);
      setForecastData(weatherResponse.data.forecast);
      setRetrievalDate(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function WeatherFetcher() {
    const { lat, lng } = useParams();
    useEffect(() => {
      fetchData(lat, lng);
    }, [lat, lng]);

    return (
      <>
        <WeatherInfo weatherData={weatherData} retrievalDate={retrievalDate}/>
        <ForecastInfo forecastData={forecastData} />
      </>
    );
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar />} /> 
        <Route path="/weather/:lat/:lng" element={<WeatherFetcher />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App