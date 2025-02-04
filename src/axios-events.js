import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/events/',
});

instance.interceptors.request.use (
  function (config) {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);


export default instance;