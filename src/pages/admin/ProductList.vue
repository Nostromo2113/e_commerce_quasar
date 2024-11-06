<template>
  <TableProduct
    v-if="preloaders.table"
    :preloadersTable="preloadersTable"
    :table-pagination="tablePagination"
    tableTitle="Продукты"
    :table-data="rows"
    @getSearchItems="getSearchItems"
  ></TableProduct>
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
import TableProduct from "src/components/admin_blocks/tables/ProductTable.vue";
import { useQuasar } from "quasar";
import { getData } from "src/utils/crud";

const path = "products";
const rows = ref([]);

const $q = useQuasar();

const preloaders = ref({
  table: true,
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

const getProducts = async (query) => {
  try {
    rows.value = await getData(path, query);
    preloaders.value.table = true;
  } catch (error) {
    preloaders.value.table = false;
  }
};

const getSearchItems = async (searchQuery) => {
  getProducts(searchQuery);
};
getProducts();
</script>
<style lang=""></style>
