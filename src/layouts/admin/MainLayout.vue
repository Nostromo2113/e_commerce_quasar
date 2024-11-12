<template>
  <q-layout view="lHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-center-y">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-avatar>
            <q-icon name="admin_panel_settings" size="30px" />
          </q-avatar>
          <span>Кабинет администратора</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <bread-crumbs></bread-crumbs>
      </q-tabs>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="700"
      :width="200"
      bordered
      :overlay="screenWidth < 1000 ? true : false"
    >
      <q-scroll-area class="fit">
        <q-item
          style="height: 150px"
          class="column q-pa-md bg-primary text-white"
        >
          <q-avatar size="56px" class="q-mb-sm">
            <img
              src="https://cdn.vectorstock.com/i/500p/52/38/avatar-icon-vector-11835238.jpg"
            />
          </q-avatar>
          <div class="text-weight-bold">{{ admin.name }}</div>
          <div>{{ admin.email }}</div>
        </q-item>
        <q-separator></q-separator>
        <q-list class="fit">
          <div v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="isActive(menuItem.path)"
              v-ripple
              @click="gotToPage(menuItem?.path)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page class="column" style="background-color: #f5f5f5">
        <router-view></router-view>
      </q-page>
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title> Title </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BreadCrumbs from "src/components/admin_ui/BreadCrumbs.vue";
import useScreenWidth from "src/plugins/screenPlugin.js";
import { initAuthApi } from "src/utils/api";
const api = initAuthApi();
const { screenWidth } = useScreenWidth();

const router = useRouter();
const route = useRoute();

const admin = ref({});

const leftDrawerOpen = ref(screenWidth.value > 1600 ? true : false);
console.log(screenWidth);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const gotToPage = (pathName) => {
  if (pathName) {
    router.push(pathName);
  } else {
    console.error("path is not defined");
    router.push({ name: "admin.index" });
  }
};

const isActive = (path) => {
  return route.name === path?.name;
};

const getAdmin = async () => {
  const path = "/admin/auth/me";
  const response = await api.post(path);
  admin.value = response.data;
  console.log("admin", admin.value);
};
getAdmin();
const menuList = [
  {
    icon: "person",
    label: "Авторизация",
    path: { name: "admin.auth" },
  },
  {
    icon: "home",
    label: "Главная",
    path: { name: "admin.index" },
  },
  {
    icon: "group",
    label: "Пользователи",
    path: { name: "admin.user.list" },
  },
  {
    icon: "local_mall",
    label: "Продукты",
    path: { name: "admin.product" },
  },
  {
    icon: "shopping_bag",
    label: "Заказы",
    path: { name: "admin.order" },
  },
  {
    icon: "category",
    label: "Категории",
    path: { name: "admin.category" },
  },
  {
    icon: "style",
    label: "Жанры",
    path: { name: "admin.genre" },
  },
];
</script>

<style></style>
