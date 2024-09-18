<template>
  <div>
    <q-card>
      <q-card-section class="row items-center q-pa-md">
        <div class="text-h6">Добавить элемент</div>
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section>
        <q-form @submit="store" @reset="resetData" class="q-gutter-md">
          <q-input
            filled
            v-model="formData.title"
            label="Название цвета"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          ></q-input>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="display: flex; align-items: center; column-gap: 10px">
              <q-input
                filled
                type="text"
                v-model="formData.hex"
                label="hex"
              ></q-input>
              <div>
                <q-btn color="accent" label="Палитра">
                  <q-menu>
                    <div class="q-pa-md">
                      <q-color
                        v-model="formData.hex"
                        no-header
                        no-footer
                        default-view="palette"
                        class="my-picker"
                      ></q-color>
                    </div>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </div>
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
      </q-card-section>
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
  hex: "",
});

const accept = ref(false);

const storePreloader = ref(false);
const store = async () => {
  if (accept.value) {
    emit("storeItem", formData.value);
    formData.value.accept = false;
    resetData();
  } else {
    console.error("Подтвердите добавление в БД");
  }
};

const resetData = () => {
  formData.value.title = "";
  formData.value.accept = false;
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
