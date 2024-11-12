<template>
  <form class="q-gutter-md q-px-md q-pb-md" @submit.prevent="login(authData)">
    <q-input
      v-model="authData.email"
      label="Email"
      lazy-rules
      hint="Будет отправлено письмо подтверждения"
    />

    <q-input
      type="password"
      v-model="authData.password"
      label="Пароль"
      lazy-rules
      hint="Не менее шести символов"
    />
    <q-input
      type="password"
      v-model="authData.confirmPassword"
      label="Повторите пароль"
      lazy-rules
      hint="Пароли должны совпадать"
    >
    </q-input>
    <div class="q-pt-md">
      <q-btn
        label="Зарегистрироваться"
        type="submit"
        color="primary"
        @click="login(authData)"
      />
    </div>
  </form>
</template>
<script setup>
import { initAuthApi } from "src/utils/api";
import { ref } from "vue";
import ToggleTab from "../tables/ToggleTab.vue";
import { useRouter } from "vue-router";
import useScreenWidth from "src/plugins/screenPlugin";
const { screenWidth } = useScreenWidth();
const router = useRouter();
const api = initAuthApi();
const user = ref({});

const authData = ref({
  email: "",
  password: "",
});
const me = async () => {
  const path = "/admin/auth/me";

  const response = await api.post(path);
  console.log(response);
  user.value = response.data;
};
const login = async (data) => {
  const path = "/admin/auth/login";
  try {
    const response = await api.post(path, {
      email: data.email,
      password: data.password,
    });
    const accessToken = response.data.access_token;
    console.log(accessToken);
    setJwtInLocalStorage(accessToken);
    me();
    router.push({ name: "admin.index" });
  } catch (error) {
    console.error("Ошибка авторизации", error);
  }
};
me();
const setJwtInLocalStorage = (token) => {
  localStorage.setItem("access_token", token);
};
</script>
<style lang="css">
.bg-image {
  background-image: linear-gradient(163deg, #312a3d 0%, #7782a5 100%);
}
</style>
