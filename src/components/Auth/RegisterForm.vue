<template>
  <v-divider class="my-7" :thickness="2"></v-divider>
  <v-form @submit.prevent="submit" ref="form">
    <v-text-field
      label="Имя пользователя"
      name="username"
      type="text"
      variant="underlined"
      class="mb-2"
      :rules="rules.username"
      v-model="form.username"
      :readonly="lockFields"
    ></v-text-field>
    <v-text-field
      label="E-mail"
      name="email"
      type="text"
      variant="underlined"
      class="mb-2"
      :rules="rules.email"
      v-model="form.email"
      :readonly="lockFields"
    ></v-text-field>

    <v-text-field
      label="Пароль"
      name="password"
      type="password"
      hint="Минимум 8 символов"
      variant="underlined"
      :rules="rules.password"
      v-model="form.password"
      :readonly="lockFields"
    ></v-text-field>
    <v-text-field
      label="Подтверждение пароля"
      name="password_confirmation"
      type="password"
      variant="underlined"
      :rules="rules.passwordConfirmation"
      v-model="form.password_confirmation"
      :readonly="lockFields"
    ></v-text-field>

    <v-row>
      <v-col>
        <v-text-field
          label="Имя"
          name="first_name"
          type="text"
          variant="underlined"
          class="mb-2"
          :rules="rules.firstName"
          v-model="form.first_name"
          :readonly="lockFields"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Фамилия"
          name="last_name"
          type="text"
          variant="underlined"
          class="mb-2"
          :rules="rules.lastName"
          v-model="form.last_name"
          :readonly="lockFields"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      color="accent"
      type="submit"
      block
      flat
      class="rounded-0 mt-3 gradient-btn-red-blue"
      :loading="submitLoading"
      :disabled="lockFields"
    >Регистрация</v-btn>
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
      Уже есть аккаунт? &#8226; <router-link to="/auth/login" class="default-link">Войти</router-link>
    </v-col>
  </v-row>
</template>

<script>
import {emailRe, maxLength, minLength, required} from "@/utils/validators";
import router from "@/router";
import {useUserStore} from "@/store/user";
import {pushToAuth} from "@/utils/router";
import {tr} from "vuetify/locale";

export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
      },
      rules: {
        username: [
          required,
          maxLength(16),
          minLength(4)
        ],
        email: [
          required,
          emailRe
        ],
        password: [
          required,
          maxLength(128),
          minLength(8)
        ],
        passwordConfirmation: [
          required,
          value => value === this.form.password ? true : 'Пароли не совпадают'
        ],
        firstName: [required],
        lastName: [required]
      },
      serverFormError: '',
      submitLoading: false,
      lockFields: false
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        result.valid ? this.applyForm() : null
      });
    },

    async applyForm() {
      this.loadingForm(true);
      this.clearServerErrors();
      const store = useUserStore();
      const errors = await store.register(this.form);
      if (!errors) {
        pushToAuth();
      } else {
        this.serverFormError = errors.response.data[0];
        this.loadingForm(false);
      }
    },

    clearServerErrors() {
      this.serverFormError = '';
    },

    loadingForm(value) {
      this.submitLoading = value;
      this.lockFields = value;
    }
  }
}
</script>

<style scoped>
@import "@/assets/styles/gradient-btn.css";
</style>
