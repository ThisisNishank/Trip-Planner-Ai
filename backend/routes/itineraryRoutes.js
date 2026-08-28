const express = require('express');
const { createItinerary } = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createItinerary);

module.exports = router;