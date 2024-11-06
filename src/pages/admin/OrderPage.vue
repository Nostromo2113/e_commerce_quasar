<template>
  <TableOrder
    v-if="preloaders.table"
    :preloadersTable="preloadersTable"
    :columns="columns"
    :table-pagination="tablePagination"
    tableTitle="Заказы"
    :table-data="rows"
    @getItem="getData"
  ></TableOrder>
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
import TableOrder from "src/components/admin_blocks/tables/OrderTable.vue";
import { useQuasar } from "quasar";
import { getData } from "src/utils/crud/baseCrud";

const path = "orders";

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
    name: "show",
    label: "Просмотреть заказ",
    align: "center",
    fiels: "show",
  },
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "user_id",
    label: "id заказчика",
    align: "center",
    field: "user_id",
  },
  {
    name: "status",
    label: "статус заказа",
    align: "center",
    field: "status",
  },
  {
    name: "total_price",
    label: "Сумма заказа",
    align: "center",
    field: "total_price",
  },
];

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const rows = ref([]);

const getOrders = async (path) => {
  try {
    rows.value = await getData(path);
    console.log(rows.value);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
getOrders(path);
</script>
<style lang=""></style>
