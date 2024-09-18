<template>
  <div>
    <q-table
      :title="tableTitle"
      :rows="rows"
      :columns="props.columns"
      :pagination="tablePagination"
      row-key="title"
      flat
      class="q-pa-md"
    >
      <template v-slot:top-right>
        <q-btn
          @click="createModal = !createModal"
          size="20px"
          color="primary"
          icon="add"
        ></q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="edit" :props="props">
            <button
              @click="(editModal = true), (editRow = props.row)"
              class="default-btn"
            >
              <q-icon name="edit" color="primary"></q-icon>
            </button>
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="surname" :props="props">
            {{ props.row.surname }}
          </q-td>
          <q-td key="patronymic" :props="props">
            {{ props.row.patronymic }}
          </q-td>
          <q-td key="age" :props="props">
            {{ props.row.age }}
          </q-td>
          <q-td key="gender" :props="props">
            {{ props.row.gender }}
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address }}
          </q-td>
          <q-td key="destroy" :props="props">
            <q-btn
              icon="close"
              flat
              @click="prepareForRemove(props.row)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="modalRemove" persistent>
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
    <q-dialog v-model="createModal" persistent full-width>
      <form-user title="Добавить пользователя" @store-item="store"></form-user>
    </q-dialog>
    <q-dialog v-model="editModal" persistent full-width>
      <form-user
        title="Редактировать пользователя"
        :data="editRow"
        :clear="false"
        operation="update"
        @update-item="update"
      ></form-user>
    </q-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import FormUser from "./FormUser.vue";
import { defineEmits } from "vue";

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
console.log(props.tableData);
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

const editModal = ref(false);
const editRow = ref({});
const createModal = ref(false);
const modalRemove = ref(false);
const itemToRemove = ref({});
const rows = ref(props.tableData);

const store = async (data) => {
  emit("storeItem", { ...data });
};

const destroy = (item) => {
  emit("destroyItem", item);
};

const onUpdateTitle = (value, row) => {
  row.title = value;
};

const update = async (data) => {
  console.log("data user", data);
  emit("updateItem", { ...data });
};

const prepareForRemove = (item) => {
  itemToRemove.value = item;
  modalRemove.value = true;
  console.log(itemToRemove.value);
};
</script>
<style lang="css"></style>
