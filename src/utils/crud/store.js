import { api } from "src/boot/axios";

export const storeData = async (path, data, file) => {
  let requestData;
  if (file) {
    requestData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          requestData.append(`${key}[]`, item);
        });
      } else if (typeof data[key] === "object" && data[key] !== null) {
        for (const nestedKey in data[key]) {
          requestData.append(`${key}[${nestedKey}]`, data[key][nestedKey]);
        }
      } else {
        requestData.append(key, data[key]);
      }
    }
    requestData.append("preview_image", file);

    requestData.forEach((value, key) => {
      console.log(key, value);
    });
  } else {
    requestData = data;
  }

  try {
    console.log("отправлояем", requestData);
    const response = await api.post(`admin/${path}`, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении ${path} с id ${data.id}:`, error);
    throw new Error(error);
  }
};
