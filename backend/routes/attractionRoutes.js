const express = require('express');
const { getAttractionInfo } = require('../controllers/attractionController');

const router = express.Router();

router.get('/:destinationName/:attractionName', getAttractionInfo);

module.exports = router;