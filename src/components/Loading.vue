<template>
  <v-progress-linear
    :active="loading"
    color="blue-primary"
    background-opacity="0"
    :indeterminate="true"
    class="ma-0"
    height="2"
    id="main-loader"
  ></v-progress-linear>
</template>

<script>
import {useLoadingStore} from "@/store/loading";
import {mapState} from "pinia";

export default {
  name: "Loading",
  computed: {
    ...mapState(useLoadingStore, ['loading'])
  }
}
</script>

<style scoped>
#main-loader {
  top: 0 !important;
}
</style>
