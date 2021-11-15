require('dotenv').config();

const baseConfig = {
  cesiumIonToken: process.env.REACT_APP_CESIUM_ION_TOKEN,
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000',
};

export default baseConfig;
