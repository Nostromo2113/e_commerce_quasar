<template>
  <q-toolbar>
    <ol class="breadcrumbs" v-for="(item, index) in breadcrumbs" :key="index">
      <li class="breadcrumb-item">
        <div>
          <RouterLink
            v-if="item.link"
            :to="item.link"
            class="breadcrumb-link"
            :class="{ 'breadcrumb-item-active': item.link == route.fullPath }"
          >
            {{ item.text }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </q-toolbar>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Получаем текущий маршрут
const route = useRoute();

const breadcrumbs = computed(() => {
  // console.log(route.matched);
  const updateBreadcrumbs = route.matched.map((routeRecord) => {
    // Формируем ссылку с динамическими параметрами
    let link = routeRecord.path;

    // Если в маршруте есть параметры (например, userId), подставляем их в путь
    Object.keys(route.params).forEach((param) => {
      link = link.replace(`:${param}`, route.params[param]);
      // console.log(link);
    });

    return {
      text: routeRecord.meta.title || routeRecord.name,
      link, // Используем обновленный путь с параметрами
      view: routeRecord.meta.view,
    };
  });
  updateBreadcrumbs.splice(0, 2);
  return updateBreadcrumbs;
});
</script>

<style scoped>
.breadcrumbs-toolbar {
  padding: 8px 16px; /* Отступы для элемента */
  box-shadow: 0px 0px 1px 0px black;
}

.breadcrumbs {
  display: flex;
  gap: 8px; /* Расстояние между элементами */
  margin: 0;
  padding: 0;
  list-style: none; /* Убираем стандартные маркеры списка */
}

.breadcrumb-item a {
  color: #24282b; /* Синий цвет ссылок в стиле Material */
  text-decoration: none;
  transition: color 0.3s; /* Плавный переход при наведении */
}

.breadcrumb-link:hover {
  color: #00796bc0;
}

.breadcrumb-link::after {
  content: " / ";
  margin: 0 4px;
}

.breadcrumb-item .breadcrumb-link.breadcrumb-item-active:hover {
  color: #6e767cb9;
  text-decoration: none;
}

/* Increased specificity for active breadcrumb */
.breadcrumb-item .breadcrumb-link.breadcrumb-item-active {
  color: #6e767cb9;
}
</style>
