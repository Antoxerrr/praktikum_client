<template>
<div class="mr-3">
  <b>{{ account.username }}</b>
</div>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "@/store/user";

export default {
  name: 'UserHeaderLabel',
  computed: {
    ...mapState(useUserStore, ['account'])
  },
}
</script>

<style scoped>

</style>
