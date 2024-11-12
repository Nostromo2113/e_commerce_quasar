<template>
  <div class="q-pa-sm">
    <DefaultTable
      v-if="preloaders.table"
      :preloadersTable="preloadersTable"
      :columns="categoriesColumns"
      :table-pagination="tablePagination"
      tableTitle="Категории"
      :table-data="rows"
      @destroyItem="(item) => destroyCategory(item, basePath)"
      @storeItem="(data) => storeCategory(data, basePath)"
      @updateItem="(row, field) => updateCategory(row, field, basePath)"
    ></DefaultTable>
  </div>
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
import { categoriesColumns } from "src/constants/tables_columns/categoriesColumns";

const basePath = "categories";

const $q = useQuasar();

const preloaders = ref({
  table: false,
});

const preloadersTable = ref({
  store: false,
  edit: false,
  destroy: false,
});

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const rows = ref([]);

const storeCategory = async (data, basePath) => {
  let result;
  preloadersTable.value.store = true;
  try {
    const response = await storeData(basePath, data);
    preloadersTable.value.store = false;
    result = true;
    resultNotification($q, result);
    getCategories(basePath);
  } catch (error) {
    result = false;
    resultNotification($q, result);
    preloadersTable.value.store = false;
  }
};

const destroyCategory = async (item, basePath) => {
  let result;
  loadNotification($q);
  try {
    await destroyData(basePath, item);
    result = true;
    getCategories(basePath);
    loadNotification($q, true);
    resultNotification($q, result);
  } catch (error) {
    console.error("Удаление не произошло", error);
    result = false;
    loadNotification($q, true);
    resultNotification($q, result);
  }
};

const updateCategory = async (row, field, basePath) => {
  if (row[field]) {
    loadNotification($q);
    const path = `${basePath}/${row.id}`;
    const data = {
      id: row.id,
      title: row.title,
    };
    try {
      await updateData(path, data);
      loadNotification($q, true);
      getCategories(basePath);
    } catch (error) {
      console.log(error);
      loadNotification($q, true);
      resultNotification(false, $q);
    }
  } else {
    console.warn("Поле не должно быть пустым.");
  }
};

const getCategories = async (basePath) => {
  try {
    rows.value = await getData(basePath);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getCategories(basePath);
</script>
<style lang=""></style>
