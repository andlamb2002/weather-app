const express = require('express');
const app = express();
const axios = require('axios');
const moment = require('moment-timezone');
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;

const city = "Charlotte";
const zip = "28215";
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// app.get('/api', (req, res) => {
//     res.send({"message": apiKey});
// });

// app.get('/api/weather', async (req, res) => {
//     try {
//       const response = await axios.get(weatherUrl);
//       res.send(response.data);
//     } catch (error) {
//       console.error('Error fetching the weather data:', error);
//       res.status(500).send(`Server error: ${error.message}`);
//     }
//   });

app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  let requestUrl;

  if (/^\d+$/.test(location)) {
      requestUrl = `${baseUrl}?zip=${location},US&appid=${apiKey}&units=imperial`;
  } else {
      requestUrl = `${baseUrl}?q=${location}&appid=${apiKey}&units=imperial`;
  }

  try {
      const response = await axios.get(requestUrl);
      res.send(response.data);
  } catch (error) {
      console.error('Error fetching the weather data:', error);
      res.status(500).send(`Server error: ${error.message}`);
  }
});

app.get('/api/forecast', async (req, res) => {
  const { location } = req.query;

  let baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  let requestUrl;

  if (/^\d+$/.test(location)) {
      requestUrl = `${baseUrl}?zip=${location},US&appid=${apiKey}&units=imperial`;
  } else {
      requestUrl = `${baseUrl}?q=${location}&appid=${apiKey}&units=imperial`;
  }

  try {
    const response = await axios.get(forecastUrl);
    const detailedForecast = response.data.list.map(forecast => {
      
      const dateTimeEST = moment.unix(forecast.dt).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
      const adjustedForecast = { ...forecast, dt_txt: dateTimeEST };

      return adjustedForecast;
    });

    let dailyForecasts = {};

    detailedForecast.forEach(forecast => {
      const dateEST = moment.unix(forecast.dt).tz('America/New_York').format('YYYY-MM-DD');

      if (!dailyForecasts[dateEST]) {
        dailyForecasts[dateEST] = {
          highTemp: forecast.main.temp_max,
          lowTemp: forecast.main.temp_min,
          hasPrecipitation: false
        };
      } else {
        if (forecast.main.temp_max > dailyForecasts[dateEST].highTemp) {
          dailyForecasts[dateEST].highTemp = forecast.main.temp_max;
        }
        if (forecast.main.temp_min < dailyForecasts[dateEST].lowTemp) {
          dailyForecasts[dateEST].lowTemp = forecast.main.temp_min;
        }
      }

      if ((forecast.rain && forecast.rain['3h'] > 0) || (forecast.snow && forecast.snow['3h'] > 0)) {
        dailyForecasts[dateEST].hasPrecipitation = true;
      }
    });

    const combinedForecast = {
      detailedForecast: detailedForecast,
      dailyForecasts: dailyForecasts
    };

    res.send(combinedForecast);
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});