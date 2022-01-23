import axios from 'axios';
import pkg from '../package.json';

const instance = axios.create({
  baseURL: process.env.AUTOINSPECTOR_API_BASE_URL || 'https://api.autoinspector.com.ar',
  timeout: 10000,
  headers: { 'User-Agent': `autoinspector-node-sdk/${pkg.version}` },
});

export default instance;
