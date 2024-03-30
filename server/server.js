const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

const city = "Charlotte";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

app.get('/api', (req, res) => {
    res.send({"message": apiKey});
});

app.get('/api/weather', async (req, res) => {
    try {
      const response = await axios.get(weatherUrl);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      res.status(500).send(`Server error: ${error.message}`);
    }
  });

  app.get('/api/forecast', async (req, res) => {
    try {
      const response = await axios.get(forecastUrl);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      res.status(500).send(`Server error: ${error.message}`);
    }
  });

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});