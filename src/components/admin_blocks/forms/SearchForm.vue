<template lang="">
  <form class="flex q-gutter-md" @submit.prevent="getSearchItems(searchQuery)">
    <q-input
      v-model="searchQuery"
      label="Поиск..."
      outlined
      dense
      style="width: 200px"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="searchQuery = ''"
          class="cursor-pointer"
        ></q-icon> </template
    ></q-input>
    <q-btn
      icon="search"
      color="primary"
      @click="getSearchItems(searchQuery)"
    ></q-btn>
  </form>
</template>
<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["getSearchItems"]);

const searchQuery = ref("");

const getSearchItems = (query) => {
  emit("getSearchItems", query);
};
</script>
<style lang=""></style>
