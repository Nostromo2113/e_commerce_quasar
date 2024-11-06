<template>
  <div class="q-pa-md">
    <q-table
      :title="tableTitle"
      :rows="rows"
      :columns="filteredColumns"
      :pagination="tablePagination"
      row-key="title"
      bordered
      flat
      ><template v-slot:top-left>
        <search-form @getSearchItems="getSearchItems" />
      </template>
      <template v-slot:top-right>
        <q-btn
          v-if="createButton"
          @click="navigateToCreateProduct"
          size="20px"
          color="primary"
          icon="add"
        ></q-btn>
        <q-btn
          v-if="selectedProducts.length > 0"
          @click="addSelectedProducts(selectedProducts)"
          color="secondary"
        >
          Добавить в заказ
        </q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="navigateToProduct(props.row.id)"
        >
          <q-td v-if="checkboxes" key="addToOrder" :props="props"
            ><q-checkbox
              v-model="selectedProducts"
              :val="props.row"
            ></q-checkbox>
          </q-td>
          <q-td key="preview_image" :props="props">
            <q-img
              :src="getImageUrl(props.row.preview_image)"
              width="160px"
              height="100px"
              rounded
            ></q-img>
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td
            key="description"
            :props="props"
            style="
              max-width: 250px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            <span v-html="props.row.description"></span>
          </q-td>
          <q-td key="publisher" :props="props">
            {{ props.row.publisher }}
          </q-td>
          <q-td key="release_date" :props="props">
            {{ props.row.release_date }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.amount }}
          </q-td>
          <q-td key="is_published" :props="props">
            {{ props.row.is_published === 1 ? "Да" : "Нет" }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import SearchForm from "../forms/SearchForm.vue";
import { defineEmits } from "vue";

const emit = defineEmits([
  "getItem",
  "storeItem",
  "updateItem",
  "addSelectedItems",
  "getSearchItems",
]);

const props = defineProps({
  tableTitle: {
    type: String,
    default: "Title",
  },
  tablePagination: {
    type: Object,
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  createButton: {
    type: Boolean,
    default: true,
  },
  checkboxes: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const rows = ref([]);
const filteredColumns = ref([]);
const selectedProducts = ref([]);

const navigateToProduct = (productId) => {
  if (!props.checkboxes) {
    router.push({ name: "admin.product.show", params: { productId } });
  }
};
const navigateToCreateProduct = () => {
  if (!props.checkboxes) {
    router.push({ name: "admin.product.create" });
  }
};

const defineColumnStructure = (columns, checkboxes) => {
  if (!checkboxes) {
    filteredColumns.value = columns.filter((el) => el.name !== "addToOrder");
  } else {
    filteredColumns.value = columns;
  }
};

const getSearchItems = (query) => {
  emit("getSearchItems", query);
};

const addSelectedProducts = (selectedProducts) => {
  emit("addSelectedItems", selectedProducts);
  selectedProducts.value = [];
};

const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${imagePath}`;
};

onMounted(() => {
  defineColumnStructure(props.columns, props.checkboxes);
});

watch(
  () => props.tableData,
  (newVal) => {
    console.log("NEWVAL");
    rows.value = newVal;
  },
  { immediate: true }
);
</script>
<style lang="css"></style>
