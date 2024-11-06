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
        component: () => import("src/pages/admin/CategoryPage.vue"),
      },
      {
        path: "genres",
        name: "admin.genre",
        component: () => import("src/pages/admin/GenrePage.vue"),
      },
      {
        path: "user",
        name: "admin.user",
        component: () => import("src/pages/admin/UserPage.vue"),
        redirect: "/admin/user/list",
        meta: { title: "Пользователи" },
        children: [
          {
            path: "list",
            name: "admin.user.list",
            component: () => import("src/pages/admin/UserList.vue"),
            meta: { title: "Пользователи" },
          },
          {
            path: ":userId",
            component: () => import("pages/admin/UserPage.vue"),
            redirect: "/admin/user/list",
            meta: { title: "Список пользователей" },
            children: [
              {
                path: "orders",
                name: "admin.user.show",
                component: () => import("src/pages/admin/UserOrder.vue"),
                meta: { title: "Пользователь" },
              },
              {
                path: "detail",
                component: () => import("src/pages/admin/UserPage.vue"),
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
                component: () => import("pages/admin/UserPage.vue"),
                meta: { title: "Пользователь" },
                redirect: (to) => `/admin/user/${to.params.userId}/orders/`,
                children: [
                  {
                    path: ":orderId",
                    name: "admin.order.show",
                    component: () => import("pages/admin/OrderShow.vue"),
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
        component: () => import("pages/admin/ProductPage.vue"),
        redirect: "/admin/product/list",
        meta: { title: "Продукты" },
        children: [
          {
            path: "list",
            name: "admin.product.list",
            component: () => import("pages/admin/ProductList.vue"),
            meta: { title: "Список продуктов" },
          },
          {
            path: "show",
            component: () => import("pages/admin/ProductPage.vue"),
            redirect: "/admin/product/list",
            meta: { title: "Список продуктов" },
            children: [
              {
                path: ":productId",
                name: "admin.product.show",
                component: () => import("pages/admin/ProductShow.vue"),
                meta: { title: "продукт" },
              },
              {
                path: "proucts/create",
                name: "admin.product.create",
                component: () => import("pages/admin/ProductShow.vue"),
                meta: { title: "создать продукт" },
              },
            ],
          },
        ],
      },
      {
        path: "orders",
        name: "admin.order",
        component: () => import("pages/admin/OrderPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
