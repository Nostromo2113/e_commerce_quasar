<template>
  <div class="q-pa-sm fix-width">
    <TableOrder
      v-if="preloaders.table"
      :preloadersTable="preloaders"
      :columns="ordersColumns"
      :table-pagination="tablePagination"
      tableTitle="Заказы"
      :table-data="rows"
    ></TableOrder>
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
import { ref, onMounted } from "vue";
import TableOrder from "src/components/admin_blocks/tables/OrderTable.vue";
import { ordersColumns } from "src/constants/tables_columns/ordersColumns";
import { getData } from "src/utils/crud/baseCrud";

const basePath = "orders";

const preloaders = ref({
  table: false,
});

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const rows = ref([]);

const getOrders = async (basePath) => {
  try {
    rows.value = await getData(basePath);
    preloaders.value.table = true;
  } catch (error) {
    console.error("Error fetching data:", error);
    preloaders.value.table = false;
  }
};
onMounted(() => {
  getOrders(basePath);
});
</script>
<style lang=""></style>
