const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');

const toGeoJson = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');
const AdmZip = require('adm-zip');

const port = process.env.PORT || 5000;
const app = express();

const origins = ['https://cellularapp.tech', 'https://www.cellularapp.tech'];

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? origins : true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const unzip = (zipFileBuffer) => {
  try {
    const zip = new AdmZip(zipFileBuffer);
    const entries = zip.getEntries();
    const kmlEntry = entries.find((entry) => entry.entryName.endsWith('.kml'));
    return kmlEntry.getData().toString('utf-8');
  } catch (e) {
    return null;
  }
};

const selectPointFeatures = (feature) => {
  return feature.geometry.type === 'Point';
};

const getDistances = (features) => {
  if (!features) {
    return null;
  }
  return features.map((feature) => {
    if (feature.properties.distances) {
      return feature.properties.distances;
    }
    return {
      top: 300,
      left: 300,
      right: 300,
    };
  });
};

app.post('/file-upload/kml', async (req, res) => {
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
});

app.post('/file-upload/geojson', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`app started at : http://localhost:${port}`);
});
