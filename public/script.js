document.getElementById('submit-button').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
      showError("Please enter a city name.");
      return;
  }

  try {
      const weatherResponse = await fetch(`/weather/${city}`);
      if (!weatherResponse.ok) {
          throw new Error(`HTTP error! status: ${weatherResponse.status}`);
      }
      
      const weatherData = await weatherResponse.json();
      updateWeatherDisplay(weatherData);
      updateDailySummary(weatherData);
  } catch (error) {
      showError(error.message);
  }
});

function updateWeatherDisplay(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temperature').textContent = data.main.temp.toFixed(2);
  document.getElementById('weather-condition').textContent = data.weather[0].description;

  document.getElementById('weather-result').classList.remove('hidden');
}

function updateDailySummary(data) {
 
  fetch('/dailyWeather')
      .then(response => response.json())
      .then(dailyData => {
          const todaySummary = dailyData.dailyWeather.find(entry => entry.date === new Date().toISOString().split('T')[0]);

          if (todaySummary) {
              document.getElementById('average-temperature').textContent = todaySummary.averageTemperature.toFixed(2);
              document.getElementById('maximum-temperature').textContent = todaySummary.maximumTemperature.toFixed(2);
              document.getElementById('minimum-temperature').textContent = todaySummary.minimumTemperature.toFixed(2);
              document.getElementById('dominant-condition').textContent = todaySummary.dominantWeatherCondition;
              document.getElementById('daily-summary').classList.remove('hidden');
          } else {
              document.getElementById('daily-summary').classList.add('hidden');
          }
      })
      .catch(err => showError("Could not fetch daily summary."));
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}
