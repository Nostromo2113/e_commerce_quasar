<template lang="">
  <q-card
    :class="{
      'user-container': screenWidth > 1150,
      column: screenWidth < 1150,
      'items-center': screenWidth < 1150,
      'q-pa-sm': screenWidth > 1150,
    }"
  >
    <ImageUpload
      class="col-3"
      title="Аватар"
      :imageLink="userData.avatar"
      @onFileChange="onFileChange"
      :showAlt="false"
      :disabledUpload="!edit"
    />
    <q-card-section id="123" class="col justify-between width-100">
      <div>
        <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
          ФИО пользователя
        </div>
        <div class="q-gutter-md" :class="{ row: screenWidth > 1150 }">
          <q-input
            v-model="userData.name"
            label="Имя"
            class="col"
            clearable
            :filled="edit"
            :readonly="!edit"
            :dense="screenWidth < 650"
          ></q-input>
          <q-input
            v-model="userData.surname"
            label="Фамилия"
            class="col"
            clearable
            :readonly="!edit"
            :filled="edit"
            :dense="screenWidth < 650"
          ></q-input>
          <q-input
            v-model="userData.patronymic"
            :readonly="!edit"
            label="Отчество"
            class="col"
            clearable
            :filled="edit"
            :dense="screenWidth < 650"
          ></q-input>
        </div>
      </div>
      <div>
        <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
          Контактные данные
        </div>
        <div class="q-gutter-md" :class="{ row: screenWidth > 650 }">
          <q-input
            v-model="phone"
            :readonly="!edit"
            label="Телефон"
            class="col-2"
            clearable
            :filled="edit"
            :dense="screenWidth < 650"
          ></q-input>
          <q-input
            v-model="userData.email"
            :readonly="!edit"
            class="col"
            label="email"
            clearable
            :filled="edit"
            :dense="screenWidth < 650"
          ></q-input>
          <q-input
            v-model="userData.address"
            :readonly="!edit"
            label="Адрес"
            class="col"
            clearable
            :filled="edit"
            :dense="screenWidth < 650"
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
            :dense="screenWidth < 650"
          ></q-input>
          <q-select
            v-model="userData.gender"
            :readonly="!edit"
            class="col"
            :options="userOptions"
            :filled="edit"
            label="Пол"
            lazy-rules
            :dense="screenWidth < 650"
          ></q-select>
        </div>
      </div>
      <q-card-actions
        :align="screenWidth > 1150 ? 'right' : 'center'"
        class="q-pt-xl"
      >
        <div
          v-if="edit"
          class="q-gutter-xl"
          :class="{ column: screenWidth < 800 }"
        >
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
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import ImageUpload from "../ImageUpload.vue";
import { showData, updateData } from "src/utils/crud/baseCrud";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import {
  loadNotification,
  resultNotification,
} from "src/utils/notifications/notification";
import useScreenWidth from "src/plugins/screenPlugin.js";
const { screenWidth } = useScreenWidth();

const $q = useQuasar();
const route = useRoute();
const userId = route.params.userId;
const phone = ref("+79999999999");
const userData = ref({});
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
  loadNotification($q);
  try {
    await updateData(path, sendData, selectedFile.value);
    getUser(userId);
    edit.value = false;
    loadNotification($q, true);
    resultNotification($q, true);
  } catch (error) {
    console.error(error);
    loadNotification($q, true);
    resultNotification($q, false);
  }
};
</script>
<style lang="css">
.user-container {
  display: flex;
  column-gap: 50px;
}
</style>
