const Destination = require('../models/Destination');

// Get all destinations (just basic info, useful for search/browse)
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().select('name state description');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get one destination's full details by name
const getDestinationByName = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      name: new RegExp(`^${req.params.name}$`, 'i'),
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { getAllDestinations, getDestinationByName };