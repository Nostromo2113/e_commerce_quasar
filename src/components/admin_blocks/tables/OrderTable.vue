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

const router = useRouter();
const navigateToOrder = (orderId, userId) => {
  router.push({ name: "admin.order.show", params: { orderId, userId } });
};
const emit = defineEmits(["storeItem", "updateItem", "destroyItem"]);

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

const preloaders = ref(props.preloadersTable);

watch(
  () => props.tableData,
  (newVal) => {
    rows.value = [...newVal];
  }
);

const addModal = ref(false);
const rows = ref(props.tableData);

const store = async (data = null) => {
  emit("storeItem", data);
};

const destroy = (item) => {
  emit("destroyItem", item);
};
</script>
<style lang="css"></style>
