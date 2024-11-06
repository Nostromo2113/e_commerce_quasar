<template>
  <TableAdmin
    v-if="preloaders.table"
    :preloadersTable="preloadersTable"
    :columns="columns"
    :table-pagination="tablePagination"
    tableTitle="Жанры"
    :table-data="rows"
    @getItem="getGenres"
    @destroyItem="destroyGenre"
    @storeItem="storeGenre"
    @updateItem="updateGenre"
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

const $q = useQuasar();

const path = "genres";

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
    label: "Жанр",
    align: "center",
    field: "title",
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

const storeGenre = async (data) => {
  preloadersTable.value.store = true;
  const response = await storeData(path, data);
  preloadersTable.value.store = false;
  getGenres();
  console.log(response.status);
  showStoreNotification(response.status, data.title);
};

const showStoreNotification = (status, title) => {
  if (status === 201) {
    $q.notify({
      message: `Тег "${title}" успешно добавлен'`,
      color: "positive",
    });
  } else if (status === 409) {
    $q.notify({
      message: `Тег "${title}" уже есть в базе`,
      color: "negative",
    });
  } else {
    $q.notify({
      message: `Ошибка добавления тега`,
      color: "negative",
    });
  }
};

const destroyGenre = async (item) => {
  const notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
    position: "center",
  });
  try {
    await destroyData(path, item);
    getGenres();
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

const updateGenre = async (row, field) => {
  console.log(row, field);
  const path = `genres/${row.id}`;
  if (row[field]) {
    const notification = $q.notify({
      spinner: true,
      message: "Запись в базу данных",
      timeout: 0,
      position: "center",
    });
    const data = {
      id: row.id,
      title: row.title,
    };
    try {
      await updateData(path, data);
      notification();
      getGenres();
    } catch (error) {
      notification();
      $q.notify({
        message: "Ошибка записи",
        position: "center",
        color: "negative",
        timeout: 2000,
      });
      console.error(error);
    }
  } else {
    console.warn("Поле не должно быть пустым.");
  }
};

const getGenres = async () => {
  try {
    rows.value = await getData(path);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getGenres();
</script>
<style lang=""></style>
