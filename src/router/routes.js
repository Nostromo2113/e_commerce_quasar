const routes = [
  {
    path: "/admin",
    component: () => import("layouts/admin/MainLayout.vue"),
    children: [
      {
        path: "index",
        name: "admin.index",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "second",
        name: "admin.second",
        component: () => import("pages/admin/PageSecond.vue"),
      },
      {
        path: "categories",
        name: "admin.category",
        component: () => import("pages/admin/CategoryAdmin.vue"),
      },
      {
        path: "tags",
        name: "admin.tag",
        component: () => import("pages/admin/TagAdmin.vue"),
      },
      {
        path: "colors",
        name: "admin.color",
        component: () => import("pages/admin/ColorAdmin.vue"),
      },
      {
        path: "users",
        name: "user.admin",
        component: () => import("pages/admin/UserAdmin.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
