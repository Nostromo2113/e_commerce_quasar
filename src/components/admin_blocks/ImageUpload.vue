<template>
  <q-card-section class="flex items-start column">
    <div class="text-subtitle1 text-h2 text-grey q-pb-sm">
      {{ props.title }}
    </div>
    <div>
      <q-img
        width="300px"
        height="300px"
        class="rounded-borders"
        :src="previewUrl"
      ></q-img>
      <div class="q-gutter-sm q-pt-md">
        <UploadInput
          :disabledUpload="disabledUpload"
          type="file"
          @change="onFileChange"
        />
        <q-input
          v-if="showAlt"
          v-model="alt"
          @input="updateAlt"
          filled
          label="ALT описание"
          dense
        ></q-input>
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";
import UploadInput from "../admin_ui/UploadInput.vue";
const props = defineProps({
  title: {
    type: String,
    default: "title",
  },
  imageLink: {
    type: String,
    default: "/images/no_image.jpg",
  },
  alt: {
    type: String,
    default: "alt",
  },
  showAlt: {
    type: Boolean,
    default: true,
  },
  disabledUpload: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onFileChange"]);
const previewUrl = ref(props.imageLink);
const selectedFile = ref();
const alt = ref(props.alt);
const onFileChange = (file) => {
  selectedFile.value = file;
  if (selectedFile.value) {
    previewUrl.value = URL.createObjectURL(selectedFile.value);
    emit("onFileChange", file);
  }
};

const updateAlt = () => {
  emit("updateAlt", alt.value);
};

watch(
  () => props.imageLink,
  (newVal) => {
    previewUrl.value = `${import.meta.env.VITE_APP_API_URL}/storage/${newVal}`;
  }
);
</script>
