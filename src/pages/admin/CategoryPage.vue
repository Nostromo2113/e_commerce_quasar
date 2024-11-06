<template>
  <TableAdmin
    v-if="preloaders.table"
    :preloadersTable="preloadersTable"
    :columns="columns"
    :table-pagination="tablePagination"
    tableTitle="Категории"
    :table-data="rows"
    @getItem="getData"
    @destroyItem="destroyCategory"
    @storeItem="storeCategory"
    @updateItem="updateCategory"
  ></TableAdmin>
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
import TableAdmin from "src/components/admin_blocks/tables/DefaultTable.vue";
import { useQuasar } from "quasar";
import {
  getData,
  updateData,
  destroyData,
  storeData,
} from "src/utils/crud/baseCrud";

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
    label: "Категория",
    align: "center",
    field: "title",
    sortable: true,
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
  const response = await storeData(basePath, data);
  preloadersTable.value.store = false;
  getCategories(basePath);
  console.log(response.status);
  showStoreNotification(response.status, data.title);
};

const showStoreNotification = (status, title) => {
  if (status === 201) {
    $q.notify({
      message: `Категория "${title}" успешно добавлен'`,
      color: "positive",
    });
  } else if (status === 409) {
    $q.notify({
      message: `Категория "${title}" уже есть в базе`,
      color: "negative",
    });
  } else {
    $q.notify({
      message: `Ошибка добавления тега`,
      color: "negative",
    });
  }
};

const destroyCategory = async (item) => {
  console.log(item);
  const notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
    position: "center",
  });
  try {
    await destroyData(path, item);
    getTags(path);
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

const updateCategory = async (row, field) => {
  if (row[field]) {
    const notification = $q.notify({
      spinner: true,
      message: "Запись в базу данных",
      timeout: 0,
      position: "center",
    });
    const categoryPath = `categories/${row.id}`;
    const data = {
      id: row.id,
      title: row.title,
    };
    try {
      await updateData(categoryPath, data);
      notification();
      getCategories(basePath);
    } catch (error) {
      console.log(error);
      notification();
      $q.notify({
        message: "Ошибка записи",
        position: "center",
        color: "negative",
        timeout: 2000,
      });
    }
  } else {
    console.warn("Поле не должно быть пустым.");
  }
};

const getCategories = async (path) => {
  try {
    rows.value = await getData(path);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getCategories(basePath);
</script>
<style lang=""></style>
