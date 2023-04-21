import axios from "axios";

const TOKEN_KEY = 'access_token';

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token);
  return token;
};

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const setHeader = () => {
  axios.defaults.headers.common.Authorization = `Token ${getToken()}`;
};

export const clearHeader = () => {
  axios.defaults.headers.common.Authorization = null;
};

export default {
  saveToken, getToken, destroyToken, setHeader, clearHeader
};
