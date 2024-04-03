const express = require('express');
const app = express();
const axios = require('axios');
const moment = require('moment-timezone');
require('dotenv').config();

const weatherApiKey = process.env.WEATHER_API_KEY;
const placesApiKey = process.env.PLACES_API_KEY;

app.get('/api', (req, res) => {
    res.send({"message": "Hello world!"});
});

app.get('/api/coordinatesByPlaceId', async (req, res) => {
  const { placeId } = req.query;
  const placesDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${placesApiKey}`;
  
  try {
    const placeResponse = await axios.get(placesDetailsUrl);
    const coordinates = placeResponse.data.result.geometry.location; 
    res.send(coordinates);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

app.get('/api/weatherByCoordinates', async (req, res) => {
  const { lat, lng } = req.query;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=imperial`;

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl)
    ]);

    const detailedForecast = forecastResponse.data.list.map(forecast => {
      const dateTimeEST = moment.unix(forecast.dt).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
      const adjustedForecast = { ...forecast, dt_txt: dateTimeEST };
      return adjustedForecast;
    });

    let dailyForecasts = {};

    detailedForecast.forEach(forecast => {
      const dateEST = forecast.dt_txt.split(' ')[0];

      if (!dailyForecasts[dateEST]) {
        dailyForecasts[dateEST] = {
          highTemp: forecast.main.temp_max,
          lowTemp: forecast.main.temp_min,
          hasPrecipitation: (forecast.rain && forecast.rain['3h'] > 0) || (forecast.snow && forecast.snow['3h'] > 0)
        };
      } else {
        dailyForecasts[dateEST].highTemp = Math.max(dailyForecasts[dateEST].highTemp, forecast.main.temp_max);
        dailyForecasts[dateEST].lowTemp = Math.min(dailyForecasts[dateEST].lowTemp, forecast.main.temp_min);
      }
    });

    const combinedData = {
      currentWeather: weatherResponse.data,
      forecast: {
        detailedForecast: detailedForecast,
        dailyForecasts: dailyForecasts
      }
    };

    res.send(combinedData);
  } catch (error) {
    console.error('Error fetching weather and forecast data:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});


app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  let requestUrl;

  if (/^\d+$/.test(location)) {
      requestUrl = `${baseUrl}?zip=${location},US&appid=${weatherApiKey}&units=imperial`;
  } else {
      requestUrl = `${baseUrl}?q=${location}&appid=${weatherApiKey}&units=imperial`;
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
      requestUrl = `${baseUrl}?zip=${location},US&appid=${weatherApiKey}&units=imperial`;
  } else {
      requestUrl = `${baseUrl}?q=${location}&appid=${weatherApiKey}&units=imperial`;
  }

  try {
    const response = await axios.get(requestUrl);
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

app.get('/api/places', async (req, res) => {
  const { location } = req.query;

  const requestUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=(cities)&components=country:US&key=${placesApiKey}&maxRows=5`;

  try {
    const response = await axios.get(requestUrl);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching the places data:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});