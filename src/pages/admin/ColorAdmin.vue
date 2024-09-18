<template>
  <table-color
    v-if="preloaderTitle"
    :preloadersTable="preloadersTable"
    :columns="columns"
    :table-pagination="tablePagination"
    tableTitle="Цвета"
    :table-data="rows"
    @getItem="getData"
    @destroyItem="destroyCategory"
    @storeItem="storeCategory"
    @updateItem="updateCategory"
  ></table-color>
  <div v-if="!preloaderTitle" class="col flex-center">
    <q-spinner-grid
      color="primary"
      size="12em"
      class="q-mx-auto"
    ></q-spinner-grid>
  </div>
</template>
<script setup>
import { ref } from "vue";
import TableColor from "src/components/admin_blocks/TableColor.vue";
import { useQuasar } from "quasar";
import {
  getData,
  updateData,
  destroyData,
  storeData,
} from "src/utils/crud/baseCrud";

const $q = useQuasar();

const path = "colors";

const preloaderTitle = ref({
  table: false,
});

const preloadersTable = ref({
  store: false,
  edit: false,
  destroy: false,
});

const columns = [
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "title",
    label: "Цвет",
    align: "center",
    field: "title",
    sortable: true,
  },
  {
    name: "hex",
    label: "hex",
    align: "center",
    field: "hex",
  },
  {
    name: "display",
    label: "Отображать",
    align: "center",
    field: "display",
  },
  {
    name: "used",
    label: "Используется",
    align: "center",
    field: "used",
    sortable: true,
  },
  {
    name: "destroy",
    label: "удалить",
    align: "right",
    field: "destroy",
  },
];

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const rows = ref([]);

const storeCategory = async (data) => {
  preloadersTable.value.store = true;
  const response = await storeData(path, data);
  preloadersTable.value.store = false;
  getTags();
  console.log(response.status);
  showStoreNotification(response.status, data.title);
};

const showStoreNotification = (status, title) => {
  if (status === 201) {
    $q.notify({
      message: `Цвет "${title}" успешно добавлен'`,
      color: "positive",
    });
  } else if (status === 409) {
    $q.notify({
      message: `Цвет "${title}" уже есть в базе`,
      color: "negative",
    });
  } else {
    $q.notify({
      message: `Ошибка добавления цвета`,
      color: "negative",
    });
  }
};

const destroyCategory = async (item) => {
  const notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
    position: "center",
  });
  try {
    await destroyData(path, item);
    getTags();
    notification();
  } catch (error) {
    console.error("Удаление не произошло");
    notification();
    $q.notify({
      message: "Ошибка записи",
      position: "center",
      color: "negative",
      timeout: 2000,
    });
  }
};

const updateCategory = async (data) => {
  const notification = $q.notify({
    spinner: true,
    message: "Запись в базу данных",
    timeout: 0,
    position: "center",
  });
  console.log("admin", data);
  try {
    await updateData(path, data);
    notification();
    getTags();
  } catch (error) {
    notification();
    $q.notify({
      message: "Ошибка записи",
      position: "center",
      color: "negative",
      timeout: 2000,
    });
  }
};

const getTags = async () => {
  try {
    rows.value = await getData(path);
    console.log(rows.value);
    preloaderTitle.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getTags();
</script>
<style lang=""></style>
