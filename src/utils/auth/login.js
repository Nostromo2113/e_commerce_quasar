import { api } from "src/boot/axios";

const login = async (data) => {
  const path = "/api/auth/login";
  try {
    const response = await api.post(path, {
      email: data.mail,
      password: data.password,
    });
    const accessToken = response.data.access_token;
    console.log(accessToken);
    setJwtInLocalStorage(accessToken);
  } catch (error) {
    wrongPassword.value = true;
    console.error("Ошибка авторизации", error);
  }
};

const setJwtInLocalStorage = (token) => {
  localStorage.setItem("access_token", token);
};

const data = {
  login: "user@mail.ru",
  password: 123456,
};

login(data);
