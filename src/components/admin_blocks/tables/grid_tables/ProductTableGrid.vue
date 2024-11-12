<template lang="">
  <q-card class="q-pa-sm" flat bordered>
    <div class="q-py-md">
      <SearchForm />
    </div>
    <div class="grid-container">
      <div v-for="row in props.rows" :key="row.id">
        <q-card flat bordered style="max-width: 90vw">
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">{{ row.title }}</div>
              <div class="text-subtitle2">id: {{ row.id }}</div>
            </div>
            <div class="q-pb-md">Издатель: {{ row.publisher }}</div>
            <q-separator></q-separator>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <div class="flex">
              <q-img
                height="200px"
                width="150px"
                :src="getImageUrl(row.preview_image)"
                rounded
                class="col"
              ></q-img>
            </div>
            <q-separator></q-separator>
          </q-card-section>
          <q-card-section class="column justify-between items-start">
            <div>
              Описание:
              <div
                style="
                  max-width: 300px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                <span v-html="row.description"></span>
              </div>
            </div>
            <div>Цена: {{ row.price }}</div>
            <div>Кол-во: {{ row.amount }}</div>
            <div>Опубликовано: {{ row.is_published > 0 ? "Да" : "Нет" }}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn @click="navigateToProduct(row.id)" color="secondary"
              >Подробно</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import SearchForm from "../../forms/SearchForm.vue";
const emit = defineEmits(["navigateToProduct"]);

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${imagePath}`;
};

const navigateToProduct = (productId) => {
  emit("navigateToProduct", productId);
};
</script>
<style lang=""></style>
