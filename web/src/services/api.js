import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.99.100:9999',
});

export default api;