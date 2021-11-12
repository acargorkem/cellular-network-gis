const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');

const fs = require('fs');
const toGeoJson = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');
const decompress = require('decompress');

const port = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedExtensions = /(\.kmz|\.kml)$/i;

const getRandomInt = (max) => Math.floor(Math.random() * max);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const unixTimeStamp = Date.now();
    const randomNumber = getRandomInt(9999);
    const extension = file.originalname.slice(-3);
    callback(null, `${unixTimeStamp}_${randomNumber}.${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedExtensions.exec(file.originalname)) {
      return cb(null, true);
    }
    return cb(new Error('Only .kml and .kmz format allowed!'), false);
  },
}).single('file');

const unzip = async (name) => {
  try {
    const files = await decompress(`uploads/${name}`, 'uploads', {
      map: (file) => {
        const fileName = name.slice(0, -4);
        file.path = fileName + file.path.slice(-4);
        return file;
      },
    });
    return files;
  } catch (err) {
    return console.error(err);
  }
};

app.post('/file-upload', async (req, res) => {
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
    let filePath = file.filename;

    if (file.originalname.endsWith('.kmz')) {
      const unzippedFile = await unzip(file.buffer);
      if (unzippedFile.length === 0) {
        return res.status(400).send({
          errorMessage: 'Not valid kmz file!',
        });
      }
      filePath = unzippedFile[0].path;
    }

    const kml = new DOMParser().parseFromString(
      fs.readFileSync(`uploads/${filePath}`, 'utf8')
    );
    const geoJson = toGeoJson.kml(kml);

    if (geoJson.features.length === 0) {
      return res.status(400).send({
        errorMessage:
          'No features found in the file. Please make sure the file contains feature collection.',
      });
    }
    return res.send({ file, geoJson });
  });
});

app.listen(port, () => {
  console.log(`app started at : http://localhost:${port}`);
});
