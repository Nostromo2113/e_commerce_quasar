<template>
  <div class="file-upload">
    <input
      type="file"
      @change="onFileChange"
      class="file-input"
      :disabled="disabledUpload"
    />
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["change"]);
const props = defineProps({
  disabledUpload: {
    type: Boolean,
    default: false,
  },
});
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit("change", file);
  }
};
</script>

<style scoped>
.file-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.file-input {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 12px;
  transition: background-color 0.3s, border-color 0.3s;
  cursor: pointer;
}

.file-input::file-selector-button {
  display: none;
}
.file-input:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
