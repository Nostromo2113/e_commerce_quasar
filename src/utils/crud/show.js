import { initAuthApi } from "../api";
const api = initAuthApi();

export const showData = async (path, id) => {
  const adminPath = `admin/${path}/${id}`;

  try {
    const response = await api.get(adminPath);
    return response;
  } catch (error) {
    console.error(error);
  }
};
