import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueAxios from "vue-axios";
import axios from "axios";
import {pushToAuth} from "@/utils/router";
import {clearHeader, destroyToken} from "@/utils/token";
import {removeAccount} from "@/utils/account";

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueAxios, axios)
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_DOMAIN;
  axios.interceptors.response.use(
    response => response,
    function (error) {
      if (error.response && error.response.status === 401) {
        clearHeader();
        destroyToken();
        removeAccount();
        pushToAuth();
      } else {
        return Promise.reject(error);
      }
  });
}
