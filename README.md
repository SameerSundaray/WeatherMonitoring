# Weather Monitoring System

## Introduction
This Weather Monitoring System is a real-time weather tracking web application that fetches weather data from the OpenWeatherMap API. It allows users to retrieve weather information for any city and view a daily summary, including temperature trends and dominant weather conditions.

## Design Choices
- **Backend**: Built using **Node.js** and **Express.js** to handle API requests, serve static files, and manage data processing.
- **Frontend**: A simple yet interactive user interface using **HTML**, **CSS**, and **JavaScript** for fetching and displaying weather data.
- **Data Storage**: Stores daily weather summaries in a `dailyWeather.json` file to keep track of daily weather trends.
- **API**: Utilizes the OpenWeatherMap API to get accurate weather data.

## Setup Instructions

### 1. Clone the Repository
Clone the project from the GitHub repository:

```bash
git clone https://github.com/your-github-handle/weather-monitoring-system.git
cd weather-monitoring-system
