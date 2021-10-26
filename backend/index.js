const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const decompress = require('decompress');

const toGeoJson = require('@tmcw/togeojson');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

const port = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    let unixTimeStamp = Date.now();
    let randomNumber = getRandomInt(9999);
    let extension = file.originalname.slice(-3);
    callback(null, `${unixTimeStamp}_${randomNumber}.${extension}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'application/vnd.google-earth.kmz' ||
      file.mimetype == 'application/vnd.google-earth.kml+xml'
    ) {
      cb(null, true);
    } else {
      return cb(new Error('Only .kml and .kmz format allowed!'), false);
    }
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

app.post('/file-upload', async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ errorMessage: err.toString() });
    } else if (err) {
      return res.status(400).send({ errorMessage: err.toString() });
    }

    const file = req.file;
    let filePath = file.filename;

    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }

    if (file.mimetype == 'application/vnd.google-earth.kmz') {
      const unzippedFile = await unzip(file.filename);
      filePath = unzippedFile[0].path;
    }

    const kml = new DOMParser().parseFromString(
      fs.readFileSync(`uploads/${filePath}`, 'utf8')
    );
    const geoJson = toGeoJson.kml(kml);

    if (geoJson.features.length == 0) {
      return res.status(400).send({
        errorMessage: `No features found in the file. Please make sure the file contains feature collection.`,
      });
    }
    res.send({ file: file, geoJson: geoJson });
  });
});

app.listen(port, () => {
  console.log(`app started at : http://localhost:${port}`);
});
