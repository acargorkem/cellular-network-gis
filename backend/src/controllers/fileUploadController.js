const multer = require('multer');
const toGeoJson = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');
const {
  unzip,
  selectPointFeatures,
  getDistances,
} = require('../utils/kmlKmzHelper');

const allowedExtensions = /(\.kmz|\.kml|\.geojson)$/i;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedExtensions.exec(file.originalname)) {
      return cb(null, true);
    }
    return cb(new Error('Only .kml, .kmz and .geojson format allowed!'), false);
  },
}).single('file');

const uploadKmlKmz = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ errorMessage: err.toString() });
    }
    if (err) {
      return res.status(400).send({ errorMessage: err.toString() });
    }
    const { file } = req;
    if (!file) {
      const error = new Error('Please upload a file');
      return res.status(400).send({ errorMessage: error.toString() });
    }

    let fileString;
    if (file.originalname.endsWith('.kmz')) {
      fileString = unzip(file.buffer);
      if (!fileString) {
        return res.status(400).send({
          errorMessage: 'Not valid kmz file!',
        });
      }
    } else {
      fileString = file.buffer.toString('utf-8');
      if (!fileString) {
        return res.status(400).send({
          errorMessage: 'Not valid kml file!',
        });
      }
    }
    const kml = new DOMParser().parseFromString(fileString);
    let geoJson = toGeoJson.kml(kml);
    if (geoJson.features.length === 0) {
      return res.status(400).send({
        errorMessage:
          'No features found in the file. Please make sure the file contains feature collection.',
      });
    }
    const points = geoJson.features.filter(selectPointFeatures);

    if (points.length === 0) {
      return res.status(400).send({
        errorMessage: 'File must contain point data!',
      });
    }
    geoJson = {
      type: 'FeatureCollection',
      features: points,
    };
    const distances = getDistances(points);

    delete file.buffer;
    return res.send({ file, geoJson, distances });
  });
};

const uploadGeojson = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ errorMessage: err.toString() });
    }
    if (err) {
      return res.status(400).send({ errorMessage: err.toString() });
    }
    const { file } = req;
    if (!file) {
      const error = new Error('Please upload a file');
      return res.status(400).send({ errorMessage: error.toString() });
    }
    const geoJson = JSON.parse(file.buffer.toString('utf-8'));
    const distances = getDistances(geoJson.features);

    delete file.buffer;
    return res.send({ file, geoJson, distances });
  });
};

module.exports = {
  uploadKmlKmz,
  uploadGeojson,
};
