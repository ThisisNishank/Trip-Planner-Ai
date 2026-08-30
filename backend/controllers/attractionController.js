const Destination = require('../models/Destination');

const getAttractionInfo = async (req, res) => {
  try {
    const { destinationName, attractionName } = req.params;

    const destination = await Destination.findOne({
      name: new RegExp(`^${destinationName}$`, 'i'),
    });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const attraction = destination.attractions.find(
      (a) => a.name.toLowerCase() === attractionName.toLowerCase()
    );

    if (!attraction || !attraction.detailedInfo) {
      return res.status(404).json({ message: 'Attraction info not available' });
    }

    res.status(200).json({ info: attraction.detailedInfo });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { getAttractionInfo };