const axios = require('axios');
const Destination = require('../models/Destination');
const { getWeatherDescription } = require('../utils/weatherCodes');

const getWeatherByDestination = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      name: new RegExp(`^${req.params.name}$`, 'i'),
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const { lat, lng } = destination.coordinates;

    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lng,
        current: 'temperature_2m,relative_humidity_2m,weather_code',
        timezone: 'auto',
      },
    });

    const current = response.data.current;

    res.status(200).json({
      destination: destination.name,
      temperature: `${current.temperature_2m}°C`,
      humidity: `${current.relative_humidity_2m}%`,
      condition: getWeatherDescription(current.weather_code),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { getWeatherByDestination };