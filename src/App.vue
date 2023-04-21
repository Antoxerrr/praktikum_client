<template>
  <v-app>
    <loading/>
    <v-fade-transition>
      <router-view/>
    </v-fade-transition>
  </v-app>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import {useUserStore} from "@/store/user";

const userStore = useUserStore();
userStore.initHeaders();
</script>

<style>
@import "@/assets/styles/autofill-fix.css";
@import "@/assets/styles/theme.css";

.v-application .v-field--error:not(.v-field--disabled) .v-label.v-field-label {
  color: rgb(var(--v-theme-red-secondary)) !important;
}

.v-application .v-input--error:not(.v-input--disabled) .v-input__details .v-messages {
  color: rgb(var(--v-theme-red-secondary)) !important;
}

.v-application .default-link {
  color: rgb(var(--v-theme-blue-primary)) !important;
  text-decoration: none;
  border-radius: 5px;
  padding: 1px 3px;
  transition: background-color 200ms ease-in-out;
}

.v-application .default-link:hover {
  background: rgba(var(--v-theme-blue-secondary), .2) !important;
}
</style>
