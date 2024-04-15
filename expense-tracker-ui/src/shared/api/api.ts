import axios from 'axios';
import { ACCESS_TOKEN_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
  }
});
