<template>
  <user-table
    v-if="preloaders.table"
    :preloadersTable="preloadersTable"
    :columns="columns"
    :table-pagination="tablePagination"
    tableTitle="Пользователи"
    :table-data="rows"
    createButton
    @getItem="getData"
    @destroyItem="destroyCategory"
    @storeItem="storeCategory"
    @updateItem="updateCategory"
  ></user-table>
  <div v-if="!preloaders.table" class="col flex-center">
    <q-spinner-grid
      color="primary"
      size="12em"
      class="q-mx-auto"
    ></q-spinner-grid>
  </div>
  <RouterView></RouterView>
</template>
<script setup>
import { ref } from "vue";
import UserTable from "src/components/admin_blocks/tables/UserTable.vue";
import { useQuasar } from "quasar";
import {
  getData,
  updateData,
  destroyData,
  storeData,
} from "src/utils/crud/baseCrud";

const $q = useQuasar();

const path = "users";

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
    name: "show",
    label: "Подробнее",
    align: "center",
    field: "show",
  },
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "avatar",
    label: "avatar",
    align: "center",
    field: "avatar",
  },
  {
    name: "email",
    label: "email",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "name",
    label: "Имя",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "surname",
    label: "Фамилия",
    align: "center",
    field: "surname",
    sortable: true,
  },
  {
    name: "patronymic",
    label: "Отчество",
    align: "center",
    field: "patronymic",
    sortable: true,
  },
  {
    name: "age",
    label: "Возраст",
    align: "center",
    field: "age",
    sortable: true,
  },
  {
    name: "gender",
    label: "Пол",
    align: "center",
    field: "gender",
    sortable: true,
  },
  {
    name: "address",
    label: "Адрес",
    align: "center",
    field: "address",
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
  try {
    preloadersTable.value.store = true;
    const response = await storeData(path, data);
    preloadersTable.value.store = false;
    getTags();
    console.log(response.status);
    showStoreNotification(response.status, data.title);
  } catch (error) {
    console.error(error);
  }
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

const updateCategory = async (row) => {
  const notification = $q.notify({
    spinner: true,
    message: "Запись в базу данных",
    timeout: 0,
    position: "center",
  });
  try {
    await updateData(path, row);
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
    console.log("USERS", rows.value);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getTags();
</script>
<style lang=""></style>
