const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3009;

const API_KEY = '3d7cfdd693c6a3ba43d20696aef891aa';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const dailyWeatherFilePath = path.join(__dirname, 'dailyWeather.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    console.log(response.data);

    updateDailyWeatherSummary(response.data);
    
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error fetching weather data:', error.response.status, error.response.data);
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

function updateDailyWeatherSummary(weatherData) {
  const today = new Date().toISOString().split('T')[0]; 
  
  const summary = {
    date: today,
    averageTemperature: weatherData.main.temp,
    maximumTemperature: weatherData.main.temp_max,
    minimumTemperature: weatherData.main.temp_min,
    dominantWeatherCondition: weatherData.weather[0].main,
  };

  fs.readFile(dailyWeatherFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading dailyWeather.json:', err);
      return;
    }

    let dailyWeather;
    try {
      dailyWeather = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing dailyWeather.json:', parseError);
      dailyWeather = { dailyWeather: [] };
    }

    const existingEntry = dailyWeather.dailyWeather.find(entry => entry.date === today);
    if (existingEntry) {
      existingEntry.averageTemperature = (existingEntry.averageTemperature + summary.averageTemperature) / 2;
      existingEntry.maximumTemperature = Math.max(existingEntry.maximumTemperature, summary.maximumTemperature);
      existingEntry.minimumTemperature = Math.min(existingEntry.minimumTemperature, summary.minimumTemperature);
    } else {
      dailyWeather.dailyWeather.push(summary);
    }

    fs.writeFile(dailyWeatherFilePath, JSON.stringify(dailyWeather, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to dailyWeather.json:', writeErr);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
