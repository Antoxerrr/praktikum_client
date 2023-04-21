import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueAxios from "vue-axios";
import axios from "axios";

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueAxios, axios)
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_DOMAIN;
}
