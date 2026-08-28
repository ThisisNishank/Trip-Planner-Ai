const express = require('express');
const { getAllDestinations, getDestinationByName } = require('../controllers/destinationController');
const { getWeatherByDestination } = require('../controllers/weatherController');

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:name/weather', getWeatherByDestination);
router.get('/:name', getDestinationByName);

module.exports = router;