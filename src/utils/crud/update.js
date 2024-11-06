import { api } from "src/boot/axios";

export const updateData = async (path, data, file) => {
  const updatePath = `admin/${path}`;
  console.log("PATH", updatePath);
  let requestData;
  console.log("update tech", data);
  if (file) {
    requestData = new FormData();
    requestData.append("_method", "PATCH");

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
    requestData.append("file", file);

    requestData.forEach((value, key) => {
      console.log(key, value);
    });
  } else {
    requestData = data;
    console.log(requestData);
    requestData._method = "PATCH";
  }
  try {
    const response = await api.post(updatePath, requestData, {
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

// ВИЗУАЛИЗАЦИЯ FORM DATA
// id: 1
// title: "Game Title"
// description: "Game Description"
// publisher: "Game Publisher"
// release_date: "2023-10-15"
// preview_image: null
// price: 29.99
// amount: 100
// is_published: true
// category[id]: 5
// genres[0]: 1
// genres[1]: 2
// genres[2]: 3
// technical_requirements[platform]: "PC"
// technical_requirements[os]: "Windows"
// technical_requirements[cpu]: "Intel i5"
// technical_requirements[gpu]: "NVIDIA GTX 1050"
// technical_requirements[ram]: 8
// technical_requirements[storage]: 512

// const data = {
//   id: 1,
//   title: "Game Title",
//   description: "Game Description",
//   publisher: "Game Publisher",
//   release_date: "2023-10-15",
//   preview_image: null,
//   price: 29.99,
//   amount: 100,
//   is_published: true,
//   category: { id: 5 },
//   genres: [1, 2, 3],
//   technical_requirements: {
//     platform: "PC",
//     os: "Windows",
//     cpu: "Intel i5",
//     gpu: "NVIDIA GTX 1050",
//     ram: 8,
//     storage: 512,
//   },
// };
