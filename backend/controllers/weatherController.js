const Destination = require('../models/Destination');
const { getWeather } = require('../utils/weatherService');

const getWeatherByDestination = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      name: new RegExp(`^${req.params.name}$`, 'i'),
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const { lat, lng } = destination.coordinates;
    const weather = await getWeather(destination.name, lat, lng);

    res.status(200).json({
      destination: destination.name,
      ...weather,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { getWeatherByDestination };