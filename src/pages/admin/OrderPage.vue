<template lang="">
  <div style="max-width: 100vw">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="54px">
            <img :src="getAvatarUrl(user.avatar)" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption>Покупатель</q-item-label>
          <q-item-label caption>Верифицирован</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>
      <q-card-section>
        <div
          class="row q-gutter-sm"
          :class="{
            column: screenWidth < 650,
            'q-gutter-xl': screenWidth > 650,
          }"
        >
          <div class="col bg-info q-pa-md rounded-borders text-overline">
            <q-item-label
              >Полное имя: {{ user.surname }} {{ user.name }}
              {{ user.patronymic }}</q-item-label
            >
            <q-item-label>Телефон: +79999999999</q-item-label>
            <q-item-label>Адрес: {{ user.address }}</q-item-label>
            <q-item-label>Email: {{ user.email }}</q-item-label>
            <q-item-label>Возраст: {{ user.age }}</q-item-label>
          </div>
          <q-separator vertical></q-separator>
          <div class="col bg-info q-pa-md rounded-borders text-overline">
            <q-item-label class="">Номер заказа: {{ orderId }}</q-item-label>
            <q-item-label
              >Позиций в заказе: {{ order.products?.length }}</q-item-label
            >
            <q-item-label
              >Стоимость заказа: {{ order.total_price }} руб</q-item-label
            >
            <q-item-label>Дата заказа: {{ order.order_date }}</q-item-label>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-toolbar>
          <q-tabs v-model="tableTab" shrink stretch>
            <q-tab
              @click="toggleTable()"
              name="orders"
              label="К заказам"
            ></q-tab>
            <q-tab
              @click="toggleTable('products')"
              name="products"
              label="Добавить продукт"
            ></q-tab>
          </q-tabs>
        </q-toolbar>
        <!-- ТУТ ПРОБЛЕМА -->
        <OrdersOverviewTable
          v-if="tableTab === 'orders'"
          tableTitle="Список заказов"
          :table-data="products"
          :preloadersTable="preloadersTable"
          :table-pagination="tablePagination"
          :createButton="false"
          @removeFromOrder="(entity, productId) => removeFromOrder(productId)"
        ></OrdersOverviewTable>
        <TableProduct
          v-if="tableTab === 'products'"
          tableTitle="Продукты"
          :table-data="productList"
          :table-pagination="tablePagination"
          :createButton="false"
          :checkboxes="true"
          :columns="productsColumns"
          @addSelectedItems="addSelectedItems"
          @getSearchItems="getSearchItems"
        >
        </TableProduct>
        <q-card-actions align="center">
          <div class="q-gutter-xl">
            <q-btn color="primary" @click="applyAll(products)"
              >Применить изменения</q-btn
            >
            <q-btn color="negative">Обновить/Сбросить</q-btn>
          </div>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { showData, getData, updateData } from "src/utils/crud/baseCrud";
import OrdersOverviewTable from "src/components/admin_blocks/tables/OrdersOverviewTable.vue";
import TableProduct from "src/components/admin_blocks/tables/ProductTable.vue";
import { productsColumns } from "src/constants/tables_columns/productsColumns";
import { useQuasar } from "quasar";

import useScreenWidth from "src/plugins/screenPlugin.js";
const { screenWidth } = useScreenWidth();

const router = useRoute();
const $q = useQuasar();
const orderId = router.params.orderId;

const order = ref({});
const user = ref({});
const products = ref([]);
const productList = ref([]);

const tableTab = ref("orders");

const preloadersTable = ref({
  store: false,
  edit: false,
  destroy: false,
});

const removeFromOrder = async (entityId) => {
  products.value = products.value.filter((product) => product.id !== entityId);
  console.log(products.value, entityId);
};

const tablePagination = ref({
  page: 1,
  rowsPerPage: 10,
});
const getOrder = async (id) => {
  const path = "orders";
  const response = await showData(path, id);
  order.value = response.data.data;
  user.value = response.data.data.user;
  products.value = response.data.data.products;
};

const toggleTable = (path) => {
  if (path) {
    tableTab.value = "products";
    getProductList(path);
  } else {
    tableTab.value = "orders";
  }
};

const getProductList = async (path, query) => {
  const response = await getData(path, query);
  productList.value = response;
  console.log(response, productList.value);
};

const getSearchItems = (query) => {
  const path = "products";
  console.log(path, query);
  getProductList(path, query);
};

const addSelectedItems = async (productsIds) => {
  productsIds.forEach((selectedProduct) => {
    const exists = products.value.some(
      (product) => product.id === selectedProduct.id
    );
    if (!exists) {
      products.value.push({
        ...selectedProduct,
        quantity: 1,
      });
    }
  });
  tableTab.value = "orders";
  const data = products.value.map((product) => {
    return {
      id: product.id,
      quantity: +product.quantity,
    };
  });

  console.warn(products.value);
};

const applyAll = async (products) => {
  const path = `orders/${orderId}`;

  const orderProductsData = {
    order_products: products.reduce((acc, { id, quantity, price }) => {
      acc[id] = {
        quantity,
        price: price,
      };
      return acc;
    }, {}),
  };
  const notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
    position: "center",
  });
  try {
    const response = await updateData(path, orderProductsData);
    notification();
    $q.notify({
      message: "Успешно",
      position: "center",
      color: "positive",
      timeout: 200,
    });
    getOrder(orderId);
  } catch (error) {
    console.error("Ошибка при отправке данных", error);
    $q.notify({
      message: "Ошибка записи",
      position: "center",
      color: "negative",
      timeout: 2000,
    });
  }
};
const getAvatarUrl = (url) => {
  return `${import.meta.env.VITE_APP_API_URL}/storage/${url}`;
};

onMounted(() => {
  getOrder(orderId);
});
</script>
<style lang=""></style>
