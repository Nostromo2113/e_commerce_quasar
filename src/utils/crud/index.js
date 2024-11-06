import { api } from "src/boot/axios";

export const getData = async (path, id = null, query = null) => {
  const adminPath = `admin/${path}`;
  let count = 0;
  try {
    console.log(query);
    const response = await api.get(adminPath, {
      params: {
        query: query,
        id: id,
      },
    });
    console.log(response);
    const data = !response.data.data ? response.data : response.data.data;
    console.log("DATA", data);
    return data;
  } catch (error) {
    if (count === 0) {
      count = 1;
      const response = await api.get(adminPath);
      const data = !response.data.data ? response.data : response.data.data;
      console.log("DATA", data);
      return data;
    }
    console.error("Error fetching data:", error);
    return;
  }
};
