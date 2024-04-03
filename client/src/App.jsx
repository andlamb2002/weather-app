import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import WeatherInfo from './Components/WeatherInfo';
import ForecastInfo from './Components/ForecastInfo';

function App() {

  function WeatherFetcher() {

    const [weatherData, setWeatherData] = useState(null);
    const [retrievalDate, setRetrievalDate] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const { lat, lng } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const weatherResponse = await axios.get(`/api/weatherByCoordinates?lat=${lat}&lng=${lng}`);
          setWeatherData(weatherResponse.data.currentWeather);
          setForecastData(weatherResponse.data.forecast);
          setRetrievalDate(new Date().toLocaleString());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
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
      <Header></Header>
      <div className="bg-bg">
        <Routes>
          <Route path="/" element={<div className="min-h-screen w-full"/>} /> 
          <Route path="/weather/:lat/:lng" element={<WeatherFetcher/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;