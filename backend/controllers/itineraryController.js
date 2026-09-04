const Destination = require('../models/Destination');
const { getWeather } = require('../utils/weatherService');
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
   const weather = await getWeather(destination.name, lat, lng);

    const itineraryText = await generateItinerary(destination, weather, days, people, budget);

    res.status(200).json({
      destination: destination.name,
      days,
      people,
      budget,
      weather,
      itinerary: itineraryText,
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { createItinerary };