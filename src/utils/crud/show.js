import { api } from "src/boot/axios";

export const showData = async (path, id) => {
  const adminPath = `admin/${path}/${id}`;

  try {
    const response = await api.get(adminPath);
    return response;
  } catch (error) {
    console.error(error);
  }
};
