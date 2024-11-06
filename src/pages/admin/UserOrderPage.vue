<template lang="">
  <div style="min-height: 100vh">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label
            >{{ user.surname }} {{ user.name }}
            {{ user.patronymic }}</q-item-label
          >
          <q-item-label caption>Покупатель</q-item-label>
          <q-item-label caption>Верифицирован</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>
      <q-card-section horizontal>
        <q-separator vertical></q-separator>
        <div class="col">
          <q-toolbar>
            <q-toolbar-title>
              <div class="text-center-y q-gutter-sm">
                <q-icon size="25px" name="manage_accounts"></q-icon>
                <span>Пользователь</span>
              </div>
            </q-toolbar-title>
          </q-toolbar>
          <UserShow></UserShow>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-pa-none q-mt-sm">
        <q-toolbar class="items-center flex justify-end q-py-md">
          <q-toolbar-title
            v-if="activeSection === 'orders'"
            class="text-dark text-start"
          >
            <div class="text-center-y q-gutter-sm">
              <q-icon size="25px" name="grading"></q-icon>
              <span>Списки заказов покупателя</span>
            </div>
          </q-toolbar-title>
          <q-toolbar-title
            v-if="activeSection === 'comments'"
            class="text-dark text-start text-center-y q-gutter-sm"
          >
            <q-icon size="25px" name="reviews"></q-icon>
            <span>Отзывы пользователя</span>
          </q-toolbar-title>
          <toggleTab
            firstTab="orders"
            secondTab="comments"
            firstLabel="Заказы"
            secondLabel="Комментарии"
            @toggleTab="(tab) => (activeSection = tab)"
          />
        </q-toolbar>
        <q-card-section v-if="activeSection === 'orders'" class="q-pa-none">
          <TableOrder
            :preloadersTable="preloadersTable"
            :columns="columns"
            :table-pagination="tablePagination"
            tableTitle="Заказы"
            :table-data="orders"
            @storeItem="(userId, query) => storeOrder(userId, query)"
          ></TableOrder>
        </q-card-section>
        <q-card-section v-if="activeSection === 'comments'" class="q-pa-md">
          <UserComments
            v-if="activeSection === 'comments'"
            :comments="comments"
            @getComments="(query) => getComments(userId, query)"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import FormUser from "src/components/admin_blocks/forms/UserForm.vue";
import TableOrder from "src/components/admin_blocks/tables/OrderTable.vue";
import UserComments from "src/components/admin_blocks/UserComments.vue";
import ToggleTab from "src/components/admin_blocks/tables/ToggleTab.vue";
import UserShow from "../../components/admin_blocks/blocks/UserShow.vue";
import {
  showData,
  updateData,
  storeData,
  getData,
} from "src/utils/crud/baseCrud";
const $q = useQuasar();
const columns = [
  {
    name: "show",
    label: "Просмотреть заказ",
    align: "center",
    fiels: "show",
  },
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "user_id",
    label: "id заказчика",
    align: "center",
    field: "user_id",
  },
  {
    name: "status",
    label: "статус заказа",
    align: "center",
    field: "status",
  },
  {
    name: "total_price",
    label: "Сумма заказа",
    align: "center",
    field: "total_price",
  },
];
const path = "users";
const route = useRoute();
const userId = route.params.userId;
const user = ref({});
const orders = ref([]);
const comments = ref([]);
const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const preloadersTable = ref({
  store: false,
  edit: false,
  destroy: false,
});

const tableTitle = ref({
  title: "Заголовок не найден",
  tab: "",
});

const activeSection = ref("orders");

const getUser = async (id) => {
  const response = await showData(path, id);
  user.value = response.data.data;
  orders.value = user.value.orders;
  console.log("GET", user.value);
};
const getComments = async (query = null, id) => {
  const response = await getData("comments", id, query);
  comments.value = response;
};

const updateUser = async (data) => {
  const notification = $q.notify({
    spinner: true,
    message: "Запись в базу данных",
    timeout: 0,
    position: "center",
  });
  try {
    await updateData(path, data);
    notification();
    getUser(userId);
  } catch (error) {
    notification();
    $q.notify({
      message: "Ошибка записи",
      position: "center",
      color: "negative",
      timeout: 2000,
    });
  }
};

const storeOrder = async (id) => {
  try {
    const response = await storeData("orders", {
      user_id: id,
    });
    getUser(userId);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUser(userId);
  toggleTable("active");
  getComments(userId);
});

const toggleTable = (table) => {
  if (table === "active") {
    tableTitle.value.title = "Активные заказы";
    tableTitle.value.tab = table;
  } else if (table === "card") {
    tableTitle.value.title = "Корзина пользователя";
    tableTitle.value.tab = table;
  } else {
    tableTitle.value.title = "Выполненные заказы";
    tableTitle.value.tab = table;
  }
};
</script>
<style lang=""></style>
