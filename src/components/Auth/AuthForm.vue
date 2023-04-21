<template>
  <v-divider class="my-7" :thickness="2"></v-divider>
  <v-form @submit.prevent="submit" ref="form">
    <v-text-field
      label="Имя пользователя"
      name="username"
      type="text"
      variant="underlined"
      class="mb-2 border-0"
      :rules="rules.username"
      v-model="form.username"
      :readonly="lockFields"
    ></v-text-field>

    <v-text-field
      id="password"
      label="Пароль"
      name="password"
      type="password"
      hint="Минимум 8 символов"
      variant="underlined"
      :rules="rules.password"
      v-model="form.password"
      :readonly="lockFields"
    ></v-text-field>
    <v-btn
      color="accent"
      type="submit"
      block
      flat
      class="rounded-0 mt-3 gradient-btn-red-blue"
      :loading="submitLoading"
      :disabled="lockFields"
    >Войти</v-btn>
    <v-row justify="center" align="center" class="text-center">
      <v-col>
        <p class="mt-5 text-red-primary" v-if="serverFormError">
          {{ serverFormError }}
        </p>
      </v-col>
    </v-row>
  </v-form>
  <v-row justify="center" align="center" class="text-center">
    <v-col class="mt-7">
      Нет аккаунта? &#8226; <router-link to="/auth/register" class="default-link">Зарегистрироваться</router-link>
    </v-col>
  </v-row>
</template>

<script>
import {maxLength, minLength, required} from "@/utils/validators";
import {useUserStore} from "@/store/user";
import {pushToHome} from "@/utils/router";

export default {
  name: "AuthForm",
  data: () => ({
    submitLoading: false,
    lockFields: false,
    form: {
      username: '',
      password: ''
    },
    rules: {
      username: [
        required,
        maxLength(16),
        minLength(4)
      ],
      password: [
        required,
        maxLength(128),
        minLength(8)
      ],
    },
    serverFormError: ''
  }),
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        result.valid ? this.applyForm() : null
      });
    },

    loadingForm(value) {
      this.submitLoading = value;
      this.lockFields = value;
    },

    async applyForm() {
      this.clearServerErrors();
      this.loadingForm(true);
      const store = useUserStore();
      const errors = await store.login(this.form);
      if (!errors) {
        pushToHome();
      } else {
        this.serverFormError = errors.response.data[0];
        this.loadingForm(false);
      }
    },

    clearServerErrors() {
      this.serverFormError = '';
    }
  }
}
</script>

<style scoped>
@import "@/assets/styles/gradient-btn.css";
</style>
