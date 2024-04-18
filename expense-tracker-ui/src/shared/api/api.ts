import axios from 'axios';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, async error => {
  return await Promise.reject(error);
});
