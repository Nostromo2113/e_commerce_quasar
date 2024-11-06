<template lang="">
  <div>
    <q-card-section class="user-container">
      <div>
        <ImageUpload
          class="col-3"
          title="Аватар"
          :imageLink="userData.avatar"
          @onFileChange="onFileChange"
          :showAlt="false"
          :disabledUpload="!edit"
        />
      </div>
      <q-card-section class="col flex column justify-between">
        <div>
          <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
            ФИО пользователя
          </div>
          <div class="row q-gutter-md">
            <q-input
              v-model="userData.name"
              label="Имя"
              class="col"
              clearable
              :filled="edit"
              style="width: 300px"
              :readonly="!edit"
            ></q-input>
            <q-input
              v-model="userData.surname"
              label="Фамилия"
              class="col"
              clearable
              :readonly="!edit"
              :filled="edit"
              style="width: 300px"
            ></q-input>
            <q-input
              v-model="userData.patronymic"
              :readonly="!edit"
              label="Отчество"
              class="col"
              clearable
              :filled="edit"
              style="width: 300px"
            ></q-input>
          </div>
        </div>
        <div>
          <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
            Контактные данные
          </div>
          <div class="row q-gutter-md">
            <q-input
              v-model="phone"
              :readonly="!edit"
              label="Телефон"
              class="col-2"
              clearable
              :filled="edit"
            ></q-input>
            <q-input
              v-model="userData.email"
              :readonly="!edit"
              class="col"
              label="email"
              clearable
              :filled="edit"
            ></q-input>
            <q-input
              v-model="userData.address"
              :readonly="!edit"
              label="Адрес"
              class="col"
              clearable
              :filled="edit"
            ></q-input>
          </div>
        </div>
        <div>
          <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
            Данные о пользователе
          </div>
          <div class="row q-gutter-md">
            <q-input
              v-model="userData.age"
              :readonly="!edit"
              class="col"
              label="Возраст"
              type="number"
              clearable
              :filled="edit"
            ></q-input>
            <q-select
              v-model="userData.gender"
              :readonly="!edit"
              class="col"
              :options="userOptions"
              :filled="edit"
              label="Пол"
              lazy-rules
            ></q-select>
          </div>
        </div>
        <q-card-actions align="right">
          <div v-if="edit" class="row q-gutter-xl">
            <q-btn @click="updateUser(userData)" color="positive"
              >Применить изменения</q-btn
            >
            <q-btn @click="getUser(userId), (edit = false)" color="secondary"
              >Отменить/Сбросить</q-btn
            >
            <q-btn color="negative">Удалить Пользователя</q-btn>
          </div>
          <q-btn v-if="!edit" @click="edit = true" color="accent"
            >Редактировать</q-btn
          >
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ImageUpload from "../ImageUpload.vue";
import { showData, updateData } from "src/utils/crud/baseCrud";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.userId;
const userData = ref({});
const phone = ref("+79999999999");
const comments = ref([]);
const selectedFile = ref(null);
const edit = ref(false);

const getUser = async (id) => {
  const response = await showData("users", id);
  userData.value = response.data.data;
  console.log(userData.value.avatar);
};

const userOptions = ["Мужской", "Женский"];

const onFileChange = (file) => {
  selectedFile.value = file;
};

console.log(userData.value.id, userData.value);

getUser(userId);
const avatarLink = ref("/images/default_avatar.jpg");

const updateUser = async (data) => {
  const path = `users/${data.id}`;
  const sendData = data;
  sendData.gender = 1;
  try {
    await updateData(path, sendData, selectedFile.value);
    getUser(userId);
    edit.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>
<style lang="css">
.user-container {
  display: flex;
  column-gap: 50px;
}
</style>
