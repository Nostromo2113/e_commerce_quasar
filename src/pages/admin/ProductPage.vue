<template lang="">
  <div>
    <!-- <toggleTab
      firstTab="product"
      secondTab="comments"
      firstLabel="Продукт"
      secondLabel="Комментарии"
      @toggleTab="(tab) => ((activeSection = tab), console.log(activeSection))"
    /> -->

    <q-card class="my-card" flat bordered>
      <q-card-section class="product-wrapper">
        <ImageUpload
          :imageLink="product.preview_image"
          :alt="alt"
          title="Превью изображение"
          @onFileChange="onFileChange"
          @updateAlt="updateAlt"
          class="col-3"
        />
        <q-card-section class="col">
          <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
            Основная информация о продукте
          </div>
          <div class="row items-start q-gutter-md">
            <q-input
              label="Название игры"
              class="col"
              v-model="product.title"
              filled
              style="width: 300px"
            ></q-input>
            <q-select
              class="col"
              v-model="product.genres"
              multiple
              :options="genresOptions"
              option-value="id"
              option-label="title"
              label="Жанры"
              filled
            ></q-select>
            <q-select
              class="col"
              v-model="product.category"
              :options="categoriesOptions"
              option-value="id"
              option-label="title"
              label="Категория"
              filled
            ></q-select>
          </div>
          <div class="text-subtitle1 text-grey row q-pb-sm q-pt-md">
            Информация об издателе
          </div>
          <div class="row q-gutter-md">
            <q-input
              v-model="product.publisher"
              label="Издатель"
              class="col"
              clearable
              filled
            ></q-input>
            <input-calendar
              v-model="product.release_date"
              class="col-4"
            ></input-calendar>
          </div>
          <div class="text-subtitle1 text-grey q-pb-sm">Данные в магазине</div>
          <div class="row q-gutter-md">
            <q-input
              v-model="product.price"
              class="col"
              label="Цена"
              type="number"
              filled
            ></q-input>
            <q-input
              v-model="product.amount"
              class="col"
              label="Количество"
              type="number"
              filled
            ></q-input>
          </div>
          <div class="col width-100">
            <div class="text-subtitle1 text-grey col q-pb-sm q-pt-md">
              Описание продукта
            </div>
            <q-editor
              v-model="product.description"
              min-height="10rem"
              class="col"
            ></q-editor>
          </div>
          <TechnicalForm
            v-model="technical_requirements"
            :data="technical_requirements"
            class="col-9"
          ></TechnicalForm>
          <q-card-actions
            align="between"
            class="justify-between width-100 q-py-xl"
          >
            <div class="q-gutter-sm">
              <q-radio
                v-model="product.is_published"
                :val="1"
                label="Опубликовано"
                color="positive"
              ></q-radio>
              <q-radio
                v-model="product.is_published"
                :val="0"
                label="Не опубликовано"
                color="negative"
              ></q-radio>
            </div>
            <div class="row q-gutter-xl">
              <q-btn
                @click="
                  productId
                    ? updateProduct(product, selectedFile)
                    : storeProduct(product, selectedFile)
                "
                outline
                color="positive"
                >Применить изменения</q-btn
              >
              <q-btn outline color="secondary">Обновить/Сбросить</q-btn>
              <q-btn
                v-if="productId"
                @click="modalRemove = true"
                outline
                color="negative"
                >Удалить продукт</q-btn
              >
            </div>
          </q-card-actions>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog v-model="modalRemove" persistent>
      <ConfirmationCard
        :itemTitle="product.title"
        @confirm="destroyProduct(path, product)"
      />
    </q-dialog>
  </div>
</template>
<script setup>
/****************EXTENSIONS****************/
import { ref, onMounted } from "vue";
import {
  getData,
  showData,
  updateData,
  storeData,
  destroyData,
} from "src/utils/crud/baseCrud";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import InputCalendar from "src/components/admin_ui/InputCalendar.vue";
import TechnicalForm from "src/components/admin_blocks/forms/TechnicalForm.vue";
import ImageUpload from "src/components/admin_blocks/ImageUpload.vue";
import ConfirmationCard from "src/components/admin_blocks/ConfirmationCard.vue";
import ToggleTab from "src/components/admin_blocks/tables/ToggleTab.vue";
const $q = useQuasar();
const router = useRouter();
const route = useRoute();
/**************************************************/

/****************VARIABLES*************/
const productId = route?.params?.productId;
const path = "products";

const product = ref({
  title: "",
  description: "",
  genres: [],
  category: "",
  price: 0,
  amount: 0,
  publisher: "",
  release_date: "",
  is_published: 0,
});

const activeSection = ref("");

const alt = ref("Описание изображения");
const genresOptions = ref(["Action", "Advintyre", "Racing", "Rpg", "Strategy"]);
const genres = ref([]);

const selectedFile = ref(null);
const selectedFileUrl = ref(null);

const modalRemove = ref(false);

const technical_requirements = ref({
  platform: "",
  os: "",
  cpu: "",
  gpu: "",
  ram: 0,
  storage: 0,
  is_recommended: 1,
});
const categoriesOptions = ref([
  "Для детей",
  "Онлайн",
  "Гонки",
  "Соревновательные",
  "Приключение",
]);
/***************HELPERS*****************/
const onFileChange = (file) => {
  selectedFile.value = file;
};

const updateAlt = (alt) => {
  alt.value = alt;
};
/**************************************/

/*******************  REQUESTS **********************/
const getProduct = async (id) => {
  const response = await showData(path, id);
  product.value = response.data.data;
  technical_requirements.value = product.value.technical_requirements;
  delete product.value.technical_requirements;
};

const getCategories = async () => {
  const path = "categories";
  const response = await getData(path);
  categoriesOptions.value = response;
};

const getGenres = async () => {
  const path = "genres";
  const response = await getData(path);
  genresOptions.value = response;
};

const updateProduct = async (productData, file) => {
  const productPath = `products/${productData.id}`;
  const data = Object.assign({}, productData);
  data.genres = data.genres.map((genre) => genre.id);
  data.technical_requirements = technical_requirements.value;
  const notification = $q.notify({
    spinner: true,
    message: "Please wait...",
    timeout: 0,
    position: "center",
  });
  delete data.preview_image;
  try {
    const response = await updateData(productPath, data, file);
    product.value = response.data.data;
    technical_requirements.value = response.data.data.technical_requirements;

    notification();
    $q.notify({
      message: "Успешно",
      position: "center",
      color: "positive",
      timeout: 200,
    });
  } catch (error) {
    notification();
    $q.notify({
      message: "Ошибка записи",
      position: "center",
      color: "negative",
      timeout: 2000,
    });
  }
};

const storeProduct = async (productData, file) => {
  const data = Object.assign({}, productData);
  data.genres = data.genres.map((genre) => genre.id);
  data.technical_requirements = technical_requirements.value;
  delete data.preview_image;
  console.log("send data", data, file, technical_requirements.value);
  try {
    const response = await storeData(path, data, file);
    product.value = response.data.data;
    technical_requirements.value = response.data.data.technical_requirements;
    previewImage.value = `${import.meta.env.VITE_APP_API_URL}/storage/${
      product.value.preview_image
    }`;
    router.push({ name: "admin.product" });
  } catch (error) {}
};

const destroyProduct = async (path, item) => {
  try {
    await destroyData(path, item);
    router.push({ name: "admin.product" });
  } catch (error) {
    console.error("Удаление не произошло", error);
  }
};
/***************************************************************/
onMounted(() => {
  if (productId) {
    getProduct(productId);
  }
  getCategories();
  getGenres();
});
</script>
<style lang="css" scoped>
.product-wrapper {
  display: flex;
}
</style>
