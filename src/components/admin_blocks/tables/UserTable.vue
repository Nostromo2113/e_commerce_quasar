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
          @click="createModal = !createModal"
          size="20px"
          color="primary"
          icon="add"
        ></q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="show" :props="props">
            <button @click="navigateToUser(props.row.id)" class="default-btn">
              <q-icon name="visibility" color="secondary" size="18px"></q-icon>
            </button>
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="avatar" :props="props">
            <q-avatar size="70px">
              <img :src="getAvatarUrl(props.row.avatar)" />
            </q-avatar>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="name" :props="props" class="cursor-pointer">
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
              color="accent"
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
    </q-dialog>
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
import { defineEmits } from "vue";
import UserForm from "src/components/admin_blocks/forms/UserForm.vue";

const router = useRouter();
const navigateToUser = (userId) => {
  router.push({ name: "admin.user.show", params: { userId } });
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

const preloaders = ref(props.preloadersTable);
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

const update = async (data) => {
  console.log("data user", data);
  emit("updateItem", { ...data });
};

const prepareForRemove = (item) => {
  itemToRemove.value = item;
  modalRemove.value = true;
  console.log(itemToRemove.value);
};

const getAvatarUrl = (url) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${url}`;
};
</script>
<style lang="css"></style>
