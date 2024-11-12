import axios from "axios";

// Функция для инициализации axios с авторизацией через JWT
export const initAuthApi = () => {
  // Создание нового экземпляра axios с базовым URL для API
  const authApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Полный базовый URL для API
  });

  // Добавляем перехватчик для запросов перед отправкой
  authApi.interceptors.request.use(
    (config) => {
      // Извлекаем токен из localStorage
      const token = localStorage.getItem("access_token");

      // Если токен существует, добавляем его в заголовки запроса
      if (token) {
        config.headers = config.headers || {}; // Если заголовки еще не заданы, создаем их
        config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
      } else {
        console.error("Токен не найден, авторизуйтесь снова"); // Если токен отсутствует, выводим сообщение об ошибке
      }

      // Возвращаем измененный config для axios
      return config;
    },
    (error) => Promise.reject(error) // Если произошла ошибка в запросе, отклоняем промис
  );

  // Добавляем перехватчик для обработки ответов от сервера
  authApi.interceptors.response.use(
    (response) => {
      // Возвращаем успешный ответ без изменений
      return response;
    },
    async (error) => {
      // Оригинальный запрос, к которому будет возвращен новый токен
      const originalRequest = error.config;

      // Проверяем, если ошибка имеет статус 401 (не авторизован)
      if (error.response && error.response.status === 401) {
        console.error("Токен истек, либо пользователь неавторизован.");
        console.error("Проверяю токен...");
        console.error(
          "Сохраненный токен: ",
          localStorage.getItem("access_token") // Выводим сохраненный токен для отладки
        );

        try {
          // Если токен истек, пытаемся обновить его с помощью refresh-токена
          const refreshResponse = await axios.post(
            `${authApi.defaults.baseURL}/admin/auth/refresh`, // Эндпоинт для обновления токена
            {}, // Тело запроса (можно передавать данные, если требуется)
            {
              headers: {
                // Добавляем текущий токен в заголовки для отправки запроса на обновление
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          // Получаем новый токен из ответа
          const newToken = refreshResponse.data.access_token;

          // Сохраняем новый токен в localStorage
          localStorage.setItem("access_token", newToken);

          // Добавляем новый токен в заголовки оригинального запроса
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          console.error("Токен успешно обновлен"); // Выводим сообщение об успешном обновлении токена

          // Повторно отправляем оригинальный запрос с новым токеном
          return authApi.request(originalRequest);
        } catch (refreshError) {
          // Если не удалось обновить токен, выводим ошибку и отклоняем промис
          console.error("Не удалось обновить токен, авторизуйтесь снова.");
          return Promise.reject(refreshError);
        }
      } else {
        // Обработка других ошибок
        if (error.response) {
          // Если сервер вернул ошибку (например, 500)
          console.error("Ошибка сервера:", error.response.status);
        } else if (error.request) {
          // Если не получен ответ от сервера
          console.error("Нет ответа от сервера:", error.request);
        } else {
          // Если ошибка в настройке запроса
          console.error("Ошибка настройки запроса:", error.message);
        }
      }

      // Возвращаем отклонение с ошибкой
      return Promise.reject(error);
    }
  );

  // Возвращаем экземпляр axios с настроенными перехватчиками
  return authApi;
};
