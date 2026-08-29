const axios = require('axios');
const { getWeatherDescription } = require('./weatherCodes');

const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const getWeather = async (destinationName, lat, lng) => {
  const cached = cache.get(destinationName);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: lat,
      longitude: lng,
      current: 'temperature_2m,relative_humidity_2m,weather_code',
      timezone: 'auto',
    },
  });

  const current = response.data.current;
  const weatherData = {
    temperature: `${current.temperature_2m}°C`,
    humidity: `${current.relative_humidity_2m}%`,
    condition: getWeatherDescription(current.weather_code),
  };

  cache.set(destinationName, { data: weatherData, timestamp: now });
  return weatherData;
};

module.exports = { getWeather };