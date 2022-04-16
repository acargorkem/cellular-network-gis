const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const baseConfig = require('./utils/baseConfig');

require('./utils/dbConnection');
require('./strategies/localStrategy');
// Routes
const fileUploadRouter = require('./routes/fileUploadRoute');
const userRouter = require('./routes/userRoute');

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

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: baseConfig.DB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/file-upload', fileUploadRouter);
app.use('/user', userRouter);

app.listen(baseConfig.port, () => {
  console.log(`app started at : http://localhost:${baseConfig.port}`);
});
