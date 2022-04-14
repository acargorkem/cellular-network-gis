const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const baseConfig = require('./utils/baseConfig');

// Routes
const fileUploadRouter = require('./routes/fileUploadRoute');

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

app.use('/file-upload', fileUploadRouter);

app.listen(baseConfig.port, () => {
  console.log(`app started at : http://localhost:${baseConfig.port}`);
});
