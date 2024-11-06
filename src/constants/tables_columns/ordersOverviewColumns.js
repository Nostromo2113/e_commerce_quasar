export const ordersOverviewColumns = [
  {
    name: "preview_image",
    label: "Эскиз",
    align: "center",
    field: "preview_image",
  },
  {
    name: "id",
    label: "id в БД",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "title",
    label: "Продукт",
    align: "center",
    field: "title",
    sortable: true,
  },
  {
    name: "description",
    label: "Описание",
    align: "center",
    field: "description",
    sortable: true,
  },
  {
    name: "publisher",
    label: "Издатель",
    align: "center",
    field: "publisher",
    sortable: true,
  },
  {
    name: "release_date",
    label: "Дата выхода",
    align: "center",
    filed: "release_date",
    sortable: true,
  },

  {
    name: "price",
    label: "Цена",
    align: "center",
    filed: "price",
  },
  {
    name: "quantity",
    label: "Единиц в заказе",
    align: "center",
    field: "quantity",
  },
  {
    name: "is_published",
    label: "Опубликован",
    align: "center",
    filed: "is_published",
  },
  {
    name: "remove",
    label: "Убать из заказа",
    align: "center",
    filed: "remove",
  },
];