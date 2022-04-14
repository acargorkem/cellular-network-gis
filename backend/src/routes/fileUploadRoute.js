const express = require('express');
const {
  uploadGeojson,
  uploadKmlKmz,
} = require('../controllers/fileUploadController');

const router = express.Router();

router.post('/kml', uploadKmlKmz);

router.post('/geojson', uploadGeojson);

module.exports = router;
