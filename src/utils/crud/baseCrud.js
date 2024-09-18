import { api } from "src/boot/axios";

export const getData = async (path) => {
  const adminPath = `admin/${path}`;
  try {
    const response = await api.get(adminPath);
    const data = !response.data.data ? response.data : response.data.data;
    console.log("DATA", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateData = async (path, data) => {
  console.log("update hex", data);
  try {
    console.log("request", data);
    const response = await api.patch(`admin/${path}/${data.id}`, data);
    console.log("res", response);
  } catch (error) {
    console.error(`Ошибка при обновлении ${path} с id ${data.id}:`, error);
    throw new Error(error);
  }
};

export const destroyData = async (path, item) => {
  try {
    await api.delete(`admin/${path}/${item.id}`);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const storeData = async (path, data) => {
  console.log("data", data);
  try {
    const response = await api.post(`admin/${path}`, data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
