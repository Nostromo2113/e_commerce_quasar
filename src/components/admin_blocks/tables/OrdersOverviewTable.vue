<template>
  <div class="q-py-md">
    <q-table
      :title="tableTitle"
      :rows="rows"
      :columns="ordersOverviewColumns"
      :pagination="tablePagination"
      row-key="title"
      bordered
      flat
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="preview_image" :props="props">
            <q-img
              :src="getImageUrl(props.row.preview_image)"
              width="150px"
              height="80px"
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
          <q-td key="quantity" :props="props" class="cursor-pointer bg-accent">
            {{ props.row.quantity }}
            <q-popup-edit
              v-model="props.row.quantity"
              title="Кол-во экземпляров"
              buttons
            >
              <q-input
                type="number"
                v-model="props.row.quantity"
                dense
                autofocus
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="is_published" :props="props">
            {{ props.row.is_published === 1 ? "Да" : "Нет" }}
          </q-td>
          <q-td key="remove" :props="props">
            <q-btn
              @click="prepareForRemove(props.row)"
              icon="remove"
              color="accent"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="modalRemove" persistent>
      <confirmation-card
        :itemTitle="removeItem.title"
        @confirm="removeFromOrder('products', removeItem.id)"
      />
    </q-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";
import { ordersOverviewColumns } from "src/constants/tables_columns/ordersOverviewColumns";
import ConfirmationCard from "../ConfirmationCard.vue";

const emit = defineEmits([
  "getItem",
  "storeItem",
  "updateItem",
  "destroyItem",
  "removeFromOrder",
]);

const router = useRouter();
const navigateToProduct = (productId) => {
  router.push({ name: "admin.product.show", params: { productId } });
};

const navigateToCreateProduct = () => {
  router.push({ name: "admin.product.create" });
};

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
});

const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${imagePath}`;
};
const preloaders = ref(false);
const rows = ref([]);
const removeItem = ref({});

onMounted(() => {
  props?.preloadersTable
    ? (preloaders.value = props?.preloadersTable)
    : (preloaders.value = false);

  rows.value = props.tableData;
});

const modalRemove = ref(false);
const prepareForRemove = (item) => {
  modalRemove.value = true;
  removeItem.value = item;
};
const removeFromOrder = async (entity, id) => {
  emit("removeFromOrder", entity, id);
};

watch(
  () => props.tableData,
  (newVal) => {
    rows.value = newVal;
  }
);
</script>
<style lang="css"></style>
