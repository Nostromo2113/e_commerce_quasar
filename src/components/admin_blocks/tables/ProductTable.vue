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
    <q-dialog v-model="createModal" persistent full-width>
      <user-form
        :preloader="preloadersTable.store"
        title="Добавить пользователя"
        @store-item="store"
      ></user-form>
    </q-dialog>
    <q-dialog v-model="editModal" persistent full-width>
      <user-form
        :preloader="preloadersTable.update"
        title="Редактировать пользователя"
        :data="editRow"
        operation="update"
        @update-item="update"
      ></user-form>
    </q-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import UserForm from "../forms/UserForm.vue";
import SearchForm from "../forms/SearchForm.vue";
import { defineEmits } from "vue";

const emit = defineEmits([
  "getItem",
  "storeItem",
  "updateItem",
  "destroyItem",
  "addSelectedItems",
  "getSearchItems",
]);

const router = useRouter();
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

const columns = [
  {
    name: "addToOrder",
    label: "Добавить в заказ",
    align: "center",
    field: "addToOrder",
  },
  {
    name: "preview_image",
    label: "Эскиз",
    align: "center",
    field: "preview_image",
  },
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "title",
    label: "Продукт",
    align: "center",
    field: "title",
    sortable: true,
  },
  {
    name: "description",
    label: "Описание",
    align: "center",
    field: "description",
    sortable: true,
  },
  {
    name: "publisher",
    label: "Издатель",
    align: "center",
    field: "publisher",
    sortable: true,
  },
  {
    name: "release_date",
    label: "Дата выхода",
    align: "center",
    filed: "release_date",
    sortable: true,
  },

  {
    name: "price",
    label: "Цена",
    align: "center",
    filed: "price",
  },
  {
    name: "amount",
    label: "Количество на складе",
    align: "center",
    filed: "amount",
  },
  {
    name: "is_published",
    label: "Опубликован",
    align: "center",
    filed: "is_published",
  },
];
const getSearchItems = (query) => {
  emit("getSearchItems", query);
};

const selectedProducts = ref([]);
const addSelectedProducts = (selectedProducts) => {
  console.log("доч", selectedProducts);
  emit("addSelectedItems", "products", selectedProducts);
  selectedProducts.value = [];
};

const filteredColumns = ref([]);

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
  preloadersTable: {
    type: Object,
  },
  createButton: {
    type: Boolean,
    default: true,
  },
  checkboxes: {
    type: Boolean,
    default: false,
  },
});

const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${imagePath}`;
};
const preloaders = ref(false);
const rows = ref([]);
console.log(preloaders.value.store);
onMounted(() => {
  props?.preloadersTable
    ? (preloaders.value = props?.preloadersTable)
    : (preloaders.value = false);
  props?.tableData ? (rows.value = props.tableData) : (rows.value = []);

  defineColumnStructure(columns, props.checkboxes);
});

const defineColumnStructure = (columns, checkboxes) => {
  if (!checkboxes) {
    console.log("check");
    filteredColumns.value = columns.filter((el) => el.name !== "addToOrder");
    console.log(filteredColumns.value);
  } else {
    filteredColumns.value = columns;
  }
};

watch(
  () => props.tableData,
  (newVal) => {
    rows.value = [...newVal];
  }
);

const editModal = ref(false);
const editRow = ref({});
const createModal = ref(false);

const store = async (data) => {
  emit("storeItem", { ...data });
};

const destroy = (item) => {
  emit("destroyItem", item);
};

const update = async (data) => {
  console.log("data user", data);
  emit("updateItem", { ...data });
};
</script>
<style lang="css"></style>

<!--
<q-dialog v-model="modalRemove" persistent>
  <q-card>
    <q-card-section class="row items-center">
      <span class="text-h6"
        >Удалить пользователя: <strong>{{ itemToRemove.name }}</strong
        >?</span
      >
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Нет" color="primary" v-close-popup></q-btn>
      <q-btn
        @click="destroy(itemToRemove)"
        flat
        label="Да"
        color="negative"
        v-close-popup
      ></q-btn>
    </q-card-actions>
  </q-card>
  <confirmation-card :itemTitle="itemToRemove.name" />
</q-dialog> -->

<!-- const modalRemove = ref(false);
const itemToRemove = ref({}); -->

<!-- const prepareForRemove = (item) => {
  itemToRemove.value = item;
  modalRemove.value = true;
  console.log(itemToRemove.value);
}; -->
