<template>
  <AuthCard>
    <template v-slot:title>
      Регистрация
    </template>
    <template v-slot:body>
      <RegisterForm/>
    </template>
  </AuthCard>
</template>

<script>
import AuthCard from "@/components/Auth/AuthCard.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

export default {
  name: "Auth",
  components: {RegisterForm, AuthCard}
}
</script>

<style scoped>

</style>
