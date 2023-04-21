<template>
  <v-layout>
    <v-app-bar color="primary" :elevation="0">
      <v-app-bar-title class="font-weight-medium">
        <div class="d-inline-flex align-center">
          <v-img src="@/assets/img/logo200x200.png" aspect-ratio="1/1" :width="35" :height="35"></v-img>
          <span class="pl-2" style="line-height: 2">Antoxer.Praktikum</span>
        </div>
      </v-app-bar-title>
      <template v-slot:append>
        <UserHeaderLabel/>
        <v-btn icon="mdi-logout" @click="logout" variant="plain"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import {useUserStore} from "@/store/user";
import {pushToAuth} from "@/utils/router";
import UserHeaderLabel from "@/components/UserHeaderLabel.vue";

export default {
  name: "Default",
  components: {UserHeaderLabel},
  methods: {
    logout() {
      const store = useUserStore();
      store.logout().then(() => {
        pushToAuth();
      });
    }
  }
}
</script>

