const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bestTimeToVisit: {
    type: String,
    required: true,
  },
  attractions: [
    {
      name: String,
      description: String,
    },
  ],
  nearestAirport: {
    type: String,
    required: true,
  },
  nearestRailwayStation: {
    type: String,
    required: true,
  },
  hotels: [
    {
      name: String,
      priceRange: String, // e.g. "Budget", "Mid-range", "Luxury"
      pricePerNight: Number,
    },
  ],
  coordinates: {
    lat: Number,
    lng: Number, // we'll need this later for the weather API
  },
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;