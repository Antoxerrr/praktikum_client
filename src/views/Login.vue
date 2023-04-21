<template>
<AuthCard>
  <template v-slot:title>
    Авторизация
  </template>
  <template v-slot:body>
    <AuthForm/>
  </template>
</AuthCard>
</template>

<script>
import AuthCard from "@/components/Auth/AuthCard.vue";
import AuthForm from "@/components/Auth/AuthForm.vue";

export default {
  name: "Login",
  components: {AuthForm, AuthCard},
}
</script>

<style scoped>

</style>
