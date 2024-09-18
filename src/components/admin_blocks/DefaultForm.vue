<template>
  <div>
    <q-card
      class="no-shadow rounded-borders q-pa-md q-mx-auto"
      style="max-width: 400px"
    >
      <q-card-section class="row items-center q-pa-none q-pb-sm">
        <div class="text-h6">Добавить элемент</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-form
        @submit="store"
        @reset="resetData"
        class="q-gutter-md"
        label="Добавить"
      >
        <q-input
          filled
          v-model="formData.title"
          label="Новая запись"
          hint="Название в текстовом формате"
          autofocus
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Поле обязательно для заполнения',
          ]"
        ></q-input>
        <q-toggle
          v-model="accept"
          label="Подтверждаю добавление в базу данных"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        ></q-toggle>

        <div style="display: flex; justify-content: space-between">
          <div>
            <q-btn label="Отправить" type="submit" color="primary"></q-btn>
            <q-btn
              label="Очистить"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            ></q-btn>
          </div>
          <div style="width: 42px">
            <q-spinner
              v-if="storePreloader"
              color="primary"
              size="3em"
            ></q-spinner>
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["storeItem"]);

const props = defineProps({
  preloader: {
    type: Boolean,
  },
});

console.log("preload", props.preloader);

import { ref, watch } from "vue";
const formData = ref({
  title: "",
});

const accept = ref(false);

const storePreloader = ref(false);
const store = async () => {
  if (accept.value) {
    emit("storeItem", formData.value);
    accept.value = false;
    resetData();
  } else {
    console.error("Подтвердите добавление в БД");
  }
};

const resetData = () => {
  formData.value.title = "";
  accept.value = false;
};

watch(
  () => props.preloader,
  (newVal) => {
    console.log("ватч прелоадер");
    storePreloader.value = newVal;
  }
);
</script>
<style lang=""></style>
