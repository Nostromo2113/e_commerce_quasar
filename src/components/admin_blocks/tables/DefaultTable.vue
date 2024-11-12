<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="text-h6 text-grey-8">Интерактивная таблица</div>
    </q-card-section>
    <q-separator></q-separator>
    <!--       card-class="bg-blue-grey-1 text-brown fix-width-table" -->
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
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="title" :props="props" class="bg-accent">
            <q-input
              :model-value="props.row.title"
              @update:model-value="(val) => onUpdateTitle(val, props.row)"
              @blur="update(props.row, 'title')"
              dense
              borderless
              input-style="text-align: center"
            >
            </q-input>
          </q-td>
          <q-td key="used" :props="props">
            {{ props?.row?.used ? props.row.used : "Нет данных" }}
          </q-td>
          <q-td key="destroy" :props="props">
            <q-btn
              icon="close"
              color="accent"
              @click="prepareForRemove(props.row)"
            ></q-btn>
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
      <ConfirmationCard
        :itemTitle="itemToRemove.title"
        @confirm="destroy(itemToRemove)"
      />
    </q-dialog>
    <q-dialog v-model="addModal" persistent>
      <default-form
        :preloader="preloadersTable.store"
        @storeItem="store"
      ></default-form>
    </q-dialog>
  </q-card>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { defineEmits } from "vue";
import ConfirmationCard from "../ConfirmationCard.vue";
import DefaultForm from "../forms/DefaultForm.vue";
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

const addModal = ref(false);
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

const update = async (row, field) => {
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

watch(
  () => props.tableData,
  (newVal) => {
    rows.value = [...newVal];
  }
);
</script>
<style lang="css"></style>
