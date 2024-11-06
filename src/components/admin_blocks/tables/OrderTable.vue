<template>
  <div class="q-pa-md">
    <q-table
      :title="tableTitle"
      :rows="rows"
      :columns="props.columns"
      :pagination="tablePagination"
      row-key="title"
      flat
      bordered
    >
      <template v-slot:top-right>
        <q-btn
          @click="addModal = !addModal"
          size="20px"
          color="primary"
          icon="add"
        ></q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="show" :props="props">
            <button
              @click="navigateToOrder(props.row.id, props.row.user_id)"
              class="default-btn"
            >
              <q-icon name="visibility" color="secondary" size="18px"></q-icon>
            </button>
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="user_id" :props="props">
            {{ props.row.user_id }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="total_price" :props="props">
            {{ props.row.total_price }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="modalRemove"
      persistent
      aria-labelledby="remove-dialog-title"
      aria-describedby="remove-dialog-description"
    >
      <q-card>
        <q-card-section class="row items-center">
          <span class="text-h6"
            >Удалить категорию: <strong>{{ itemToRemove.title }}</strong
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
    </q-dialog>
    <q-dialog v-model="addModal" persistent>
      <ConfirmationCard itemTitle="Создать заказ" destroy @confirm="store" />
    </q-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";

import { useRouter } from "vue-router";
import { defineEmits } from "vue";
import ConfirmationCard from "../ConfirmationCard.vue";
import DefaultForm from "../forms/DefaultForm.vue";

const router = useRouter();
const navigateToOrder = (orderId, userId) => {
  router.push({ name: "admin.order.show", params: { orderId, userId } });
};
const emit = defineEmits(["getItem", "storeItem", "updateItem", "destroyItem"]);

const props = defineProps({
  tableTitle: {
    type: String,
    default: "Title",
  },
  columns: {
    type: Array,
  },
  tablePagination: {
    type: Object,
  },
  tableData: {
    type: Array,
  },
  preloadersTable: {
    type: Object,
  },
});
console.log(props.columns);
const responseStatus = ref(props.responses);

const preloaders = ref(props.preloadersTable);
console.log(preloaders.value.store);
onMounted(() => {});

watch(
  () => props.tableData,
  (newVal) => {
    rows.value = [...newVal];
  }
);

const addModal = ref(false);
const modalRemove = ref(false);
const itemToRemove = ref({});
const rows = ref(props.tableData);

const store = async (data = null) => {
  emit("storeItem", data);
};

const destroy = (item) => {
  emit("destroyItem", item);
};

const onUpdateTitle = (value, row) => {
  row.title = value;
};

const update = async (row, field) => {
  console.log("+++", row, field, "+++");
  if (row[field]) {
    emit("updateItem", row, field);
  } else {
    console.warn("Поле не должно быть пустым.");
  }
};

const prepareForRemove = (item) => {
  itemToRemove.value = item;
  modalRemove.value = true;
  console.log(itemToRemove.value);
};
</script>
<style lang="css"></style>
