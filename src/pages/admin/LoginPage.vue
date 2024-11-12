<template>
  <div class="col flex-center bg-image">
    <q-card
      :style="screenWidth > 1200 ? { width: '30%' } : { width: '80%' }"
      style="display: flex; flex-direction: column"
    >
      <q-card-section>
        <q-avatar size="103px" class="absolute-center shadow-10">
          <img
            src="https://cdn.vectorstock.com/i/500p/52/38/avatar-icon-vector-11835238.jpg"
          />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <ToggleTab
          class="q-mt-xl"
          firstLabel="Войти"
          secondLabel="Регистрация"
          firstTab="login"
          secondTab="registration"
          @toggleTab="toggleAuthMode"
        />
      </q-card-section>
      <q-card-section class="flex-center" style="flex: 1">
        <RegistrationForm v-if="authMode === 'registration'" class="col" />
        <LoginForm v-if="authMode === 'login'" class="col" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { initAuthApi } from "src/utils/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useScreenWidth from "src/plugins/screenPlugin";
import RegistrationForm from "src/components/admin_blocks/forms/RegistrationForm.vue";
import ToggleTab from "src/components/admin_blocks/tables/ToggleTab.vue";
import LoginForm from "src/components/admin_blocks/forms/LoginForm.vue";
const { screenWidth } = useScreenWidth();
const router = useRouter();
const api = initAuthApi();
const user = ref({});
const authMode = ref("login");

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

const toggleAuthMode = (tab) => {
  authMode.value = tab;
  console.log(authMode.value);
};
</script>
<style lang="css">
.bg-image {
  background-image: linear-gradient(163deg, #312a3d 0%, #7782a5 100%);
}
</style>
