export const resultNotification = ($q, status) => {
  if (status) {
    $q.notify({
      message: "Успешно",
      color: "positive",
      timeout: 2000,
    });
  } else {
    $q.notify({
      message: "Ошибка. Возможно уже есть в базе данных",
      color: "negative",
      position: "center",
      timeout: 2000,
    });
  }
};

export const loadNotification = ($q, over = false) => {
  const notification = $q.notify({
    spinner: true,
    message: "Запись в базу данных",
    timeout: 0,
    position: "center",
  });
  if (over) {
    notification();
  }
};
