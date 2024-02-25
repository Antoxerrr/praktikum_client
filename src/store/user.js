import { defineStore } from 'pinia'
import {getAccount, removeAccount, setAccount} from "@/utils/account";
import {clearHeader, destroyToken, getToken, saveToken, setHeader} from "@/utils/token";
import axios from "axios";
import {startGlobalLoading, stopGlobalLoading} from "@/utils/loading";

export const useUserStore = defineStore('user', {
  state: () => ({
    account: getAccount(),
    token: getToken()
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(form) {
      try {
        const response = await axios.post('/users/auth/login/', form);
        this.account = setAccount(response.data.user);
        this.token = saveToken(response.data.token);
        setHeader();
      }
      catch (error) {
        return error;
      }
    },

    async register(form) {
      try {
        await axios.post('/users/auth/register/', form)
      }
      catch (error) {
        return error;
      }
    },

    async logout() {
      startGlobalLoading();
      try {
        destroyToken();
        removeAccount();
        clearHeader();
        this.clearState();
      }
      catch {}
      finally {
        stopGlobalLoading();
      }
    },

    initHeaders() {
      if (getToken()) {
        setHeader();
      }
    },

    clearState() {
      this.account = {};
      this.token = null;
    }
  }
})
