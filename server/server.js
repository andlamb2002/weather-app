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
      const detailedForecast = response.data.list; 
  
      let dailyForecasts = {}; 
  
      detailedForecast.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toISOString().split('T')[0]; 
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            highTemp: forecast.main.temp_max,
            lowTemp: forecast.main.temp_min,
            hasPrecipitation: false
          };
        } else {
          if (forecast.main.temp_max > dailyForecasts[date].highTemp) {
            dailyForecasts[date].highTemp = forecast.main.temp_max;
          }
          if (forecast.main.temp_min < dailyForecasts[date].lowTemp) {
            dailyForecasts[date].lowTemp = forecast.main.temp_min;
          }
        }

        if ((forecast.rain && forecast.rain['3h'] > 0) || (forecast.snow && forecast.snow['3h'] > 0)) {
          dailyForecasts[date].hasPrecipitation = true;
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

function convertToEST(unixTimestamp) {
return moment.unix(unixTimestamp)
                .tz('America/New_York')
                .format('YYYY-MM-DD HH:mm:ss');
}

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});