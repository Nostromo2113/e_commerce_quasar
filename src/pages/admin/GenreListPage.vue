<template>
  <DefaultTable
    v-if="preloaders.table"
    :preloadersTable="preloaders"
    :columns="genresColumns"
    :table-pagination="tablePagination"
    tableTitle="Жанры"
    :table-data="rows"
    @destroyItem="(item) => destroyGenre(item, basePath)"
    @storeItem="(data) => storeGenre(data, basePath)"
    @updateItem="(row, field) => updateGenre(row, field, basePath)"
  ></DefaultTable>
  <div v-if="!preloaders.table" class="col flex-center">
    <q-spinner-grid
      color="primary"
      size="12em"
      class="q-mx-auto"
    ></q-spinner-grid>
  </div>
</template>
<script setup>
import { ref } from "vue";
import DefaultTable from "src/components/admin_blocks/tables/DefaultTable.vue";
import { useQuasar } from "quasar";
import {
  resultNotification,
  loadNotification,
} from "src/utils/notifications/notification";
import {
  getData,
  updateData,
  destroyData,
  storeData,
} from "src/utils/crud/baseCrud";
import { genresColumns } from "src/constants/tables_columns/genresColumns";

const $q = useQuasar();

const basePath = "genres";

const preloaders = ref({
  table: false,
  store: false,
});

const tablePagination = ref({
  page: 1,
  rowsPerPage: 20,
});
const rows = ref([]);

const storeGenre = async (data, basePath) => {
  console.log("STORE", data, basePath);
  loadNotification($q);
  try {
    preloaders.value.store = true;
    const response = await storeData(basePath, data);
    preloaders.value.store = false;
    loadNotification($q, true);
    resultNotification($q, true);
    getGenres(basePath);
    console.log("rows", rows.value);
  } catch (error) {
    result = false;
    console.error(error);
    loadNotification($q, true), resultNotification($q, false);
  }
};

const destroyGenre = async (item, basePath) => {
  loadNotification($q);
  try {
    await destroyData(basePath, item);
    getGenres(basePath);
    loadNotification($q, true);
    resultNotification($q, true);
  } catch (error) {
    console.error("Удаление не произошло");
    loadNotification($q, true);
    resultNotification($q, false);
  }
};

const updateGenre = async (row, field, basePath) => {
  const path = `${basePath}/${row.id}`;
  loadNotification($q);
  if (row[field]) {
    const data = {
      id: row.id,
      title: row.title,
    };
    try {
      await updateData(path, data);
      getGenres(basePath);
      loadNotification($q, true);
      resultNotification($q, true);
    } catch (error) {
      console.error(error);
      loadNotification($q, true);
      resultNotification($q, false);
    }
  } else {
    console.warn("Поле не должно быть пустым.");
    resultNotification($q, false);
  }
};

const getGenres = async (basePath) => {
  try {
    rows.value = await getData(basePath);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getGenres(basePath);
</script>
<style lang=""></style>
