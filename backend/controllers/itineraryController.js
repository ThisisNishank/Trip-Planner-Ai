const axios = require('axios');
const Destination = require('../models/Destination');
const { getWeatherDescription } = require('../utils/weatherCodes');
const { generateItinerary } = require('../utils/aiService');

const createItinerary = async (req, res) => {
  try {
    const { destinationName, days, people, budget } = req.body;

    if (!destinationName || !days || !people || !budget) {
      return res.status(400).json({ message: 'Please provide destinationName, days, people, and budget' });
    }

    const destination = await Destination.findOne({
      name: new RegExp(`^${destinationName}$`, 'i'),
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const { lat, lng } = destination.coordinates;

    const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lng,
        current: 'temperature_2m,relative_humidity_2m,weather_code',
        timezone: 'auto',
      },
    });

    const current = weatherResponse.data.current;
    const weather = {
      temperature: `${current.temperature_2m}°C`,
      humidity: `${current.relative_humidity_2m}%`,
      condition: getWeatherDescription(current.weather_code),
    };

    const itineraryText = await generateItinerary(destination, weather, days, people, budget);

    res.status(200).json({
      destination: destination.name,
      days,
      people,
      budget,
      weather,
      itinerary: itineraryText,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { createItinerary };