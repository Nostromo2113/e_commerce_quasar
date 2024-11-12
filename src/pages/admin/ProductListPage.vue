<template>
  <div class="q-pa-sm fix-width">
    <ProductTable
      v-if="preloaders.table"
      :table-pagination="tablePagination"
      tableTitle="Продукты"
      :table-data="rows"
      :columns="productsColumns"
      @getSearchItems="(searchQuery) => getSearchItems(basePath, searchQuery)"
    ></ProductTable>
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
import ProductTable from "src/components/admin_blocks/tables/ProductTable.vue";
import { productsColumns } from "src/constants/tables_columns/productsColumns";
import { getData } from "src/utils/crud";

const basePath = "products";
const rows = ref([]);

const preloaders = ref({
  table: false,
});

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});

const getProducts = async (basePath, query = null) => {
  try {
    rows.value = await getData(basePath, query);
    console.log(rows.value);
    preloaders.value.table = true;
  } catch (error) {
    preloaders.value.table = true;
  }
};

const getSearchItems = async (basePath, searchQuery) => {
  console.log("send", searchQuery);
  const id = null;
  getProducts(basePath, searchQuery);
};
getProducts(basePath);
</script>
<style lang=""></style>
