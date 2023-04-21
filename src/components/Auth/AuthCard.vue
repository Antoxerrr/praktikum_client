<template>
<v-card class="pa-3" color="background-soft">
  <v-card-subtitle class="text-center auth-card-subtitle">
    <slot name="subtitle">
      <span class="gradient-brand-text">Antoxer.Praktikum</span>
    </slot>
  </v-card-subtitle>
  <v-card-title class="text-center">
    <slot name="title">
      <!-- Card Title Slot -->
    </slot>
  </v-card-title>
  <v-card-text>
    <slot name="body">
      <!-- Card Body Slot -->
    </slot>
  </v-card-text>
</v-card>
</template>

<script>
export default {
  name: "AuthCard"
}
</script>

<style scoped>
.auth-card-subtitle {
  --v-medium-emphasis-opacity: 0.7;
}

.gradient-brand-text {
  -webkit-text-fill-color: transparent;
  /*background: -webkit-linear-gradient( 120deg, #B3001B 20%, #279AF1 );*/
  background: -webkit-linear-gradient( 120deg, #279AF1 30%, #B3001B );
  background-clip: text;
  font-weight: bold;
}
</style>
