import { api } from "src/boot/axios";

export const destroyData = async (path, item) => {
  try {
    await api.delete(`admin/${path}/${item.id}`);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
