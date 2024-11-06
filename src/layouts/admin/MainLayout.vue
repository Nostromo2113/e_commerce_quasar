<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-center-y">
          <q-btn
            v-if="false"
            dense
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
          />
          <q-avatar>
            <q-icon name="admin_panel_settings" size="30px" />
          </q-avatar>
          Кабинет администратора
        </q-toolbar-title>
        <q-tabs v-for="(menuItem, index) in menuList" :key="index">
          <q-route-tab :to="menuItem.path">{{ menuItem.label }}</q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" :breakpoint="700" :width="200" bordered>
      <q-scroll-area class="fit">
        <q-toolbar>
          <q-toolbar-title class="text-dark text-center">
            <q-icon name="store"></q-icon>
            Магазин
          </q-toolbar-title>
        </q-toolbar>
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
    <q-page-container class="column justify-center items-center">
      <q-page class="main-container column">
        <bread-crumbs></bread-crumbs>
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BreadCrumbs from "src/components/admin_ui/BreadCrumbs.vue";

const router = useRouter();
const route = useRoute();

const leftDrawerOpen = ref(false);
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

const menuList = [
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
  // {
  //   icon: "palette",
  //   label: "Цвета",
  //   path: { name: "admin.color" },
  // },
];
</script>

<style></style>
