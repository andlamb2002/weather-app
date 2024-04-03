import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import ForecastInfo from './components/ForecastInfo/ForecastInfo';

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
    <div>
      <WeatherInfo weatherData={weatherData} retrievalDate={retrievalDate}></WeatherInfo>
      <ForecastInfo forecastData={forecastData}></ForecastInfo>
    </div>
    // <Router>
    //   <Switch>
    //     <Route path="/" exact component={SearchBar} />
    //     <Route path="/weather/:city" exact component={WeatherInfo} />
    //     <Route path="/forecast/:city" exact component={ForecastInfo} />
    //   </Switch>
    // </Router>
  )
}

export default App