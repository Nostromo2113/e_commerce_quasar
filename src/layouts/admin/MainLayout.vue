<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!--                <q-btn dense flat round icon="menu"/>-->
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
        <q-tabs align="left">
          <q-route-tab :to="{ name: 'admin.index' }" label="Index" />
          <q-route-tab :to="{ name: 'admin.second' }" label="Second" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="700"
      :width="200"
      bordered
    >
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

    <q-page-container>
      <q-page class="column justify-start">
        <router-view></router-view>
      </q-page>
    </q-page-container>
    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const leftDrawerOpen = ref(true);
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
    icon: "shopping_bag",
    label: "Заказы",
  },
  {
    icon: "local_mall",
    label: "Продукты",
  },
  {
    icon: "category",
    label: "Категории",
    path: { name: "admin.category" },
  },
  {
    icon: "style",
    label: "Теги",
    path: { name: "admin.tag" },
  },
  {
    icon: "palette",
    label: "Цвета",
    path: { name: "admin.color" },
  },
  {
    icon: "group",
    label: "Пользователи",
    path: { name: "user.admin" },
  },
];
</script>

<style></style>
