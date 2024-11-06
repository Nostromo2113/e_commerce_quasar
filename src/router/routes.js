const routes = [
  {
    path: "/admin",
    component: () => import("layouts/admin/MainLayout.vue"),
    redirect: "/admin/index",
    children: [
      {
        path: "index",
        name: "admin.index",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "categories",
        name: "admin.category",
        component: () => import("src/pages/admin/CategoryListPage.vue"),
      },
      {
        path: "genres",
        name: "admin.genre",
        component: () => import("src/pages/admin/GenreListPage.vue"),
      },
      {
        path: "user",
        name: "admin.user",
        component: () => import("src/layouts/admin/UserLayout.vue"),
        redirect: "/admin/user/list",
        meta: { title: "Пользователи" },
        children: [
          {
            path: "list",
            name: "admin.user.list",
            component: () => import("src/pages/admin/UserListPage.vue"),
            meta: { title: "Пользователи" },
          },
          {
            path: ":userId",
            component: () => import("src/layouts/admin/UserLayout.vue"),
            redirect: "/admin/user/list",
            meta: { title: "Список пользователей" },
            children: [
              {
                path: "orders",
                name: "admin.user.show",
                component: () => import("src/pages/admin/UserOrderPage.vue"),
                meta: { title: "Пользователь" },
              },
              {
                path: "detail",
                component: () => import("src/layouts/admin/UserLayout.vue"),
                redirect: (to) => `/admin/user/${to.params.userId}/orders/`,
                meta: { title: "Пользователь" },
                children: [
                  {
                    path: "detail",
                    name: "admin.user.detail",
                    component: () =>
                      import("src/components/admin_blocks/blocks/UserShow.vue"),
                    meta: { title: "Пользователь подробно" },
                  },
                ],
              },
              {
                path: "order",
                name: "admin.user.order",
                component: () => import("src/layouts/admin/UserLayout.vue"),
                meta: { title: "Пользователь" },
                redirect: (to) => `/admin/user/${to.params.userId}/orders/`,
                children: [
                  {
                    path: ":orderId",
                    name: "admin.order.show",
                    component: () => import("src/pages/admin/OrderPage.vue"),
                    meta: { title: "Заказы пользователя" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "product",
        name: "admin.product",
        component: () => import("src/layouts/admin/ProductLayout.vue"),
        redirect: "/admin/product/list",
        meta: { title: "Продукты" },
        children: [
          {
            path: "list",
            name: "admin.product.list",
            component: () => import("src/pages/admin/ProductListPage.vue"),
            meta: { title: "Список продуктов" },
          },
          {
            path: "show",
            component: () => import("src/layouts/admin/ProductLayout.vue"),
            redirect: "/admin/product/list",
            meta: { title: "Список продуктов" },
            children: [
              {
                path: ":productId",
                name: "admin.product.show",
                component: () => import("src/pages/admin/ProductPage.vue"),
                meta: { title: "продукт" },
              },
              {
                path: "proucts/create",
                name: "admin.product.create",
                component: () => import("src/pages/admin/ProductPage.vue"),
                meta: { title: "создать продукт" },
              },
            ],
          },
        ],
      },
      {
        path: "orders",
        name: "admin.order",
        component: () => import("src/pages/admin/OrderListPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
