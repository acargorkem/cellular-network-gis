import axios from 'axios';
import baseConfig from '../config';

const { baseURL } = baseConfig;

export default axios.create({
  baseURL,
});
