<template lang="">
  <div>
    <div class="text-subtitle1 text-grey q-pb-sm q-pt-md">
      Системные требования
    </div>
    <div>
      <div>
        <div class="q-gutter-sm">
          <q-input
            label="Платформа"
            v-model="technical_requirements.platform"
            dense
            filled
          ></q-input>

          <q-input
            v-model="technical_requirements.os"
            label="Операционная система"
            dense
            filled
          ></q-input>
          <q-input
            v-model="technical_requirements.cpu"
            label="Процессор"
            dense
            filled
          ></q-input>
          <q-input
            v-model="technical_requirements.gpu"
            label="Видеокарта"
            dense
            filled
          ></q-input>
          <q-input
            v-model="technical_requirements.ram"
            label="Оперативная память"
            dense
            filled
          ></q-input>
          <q-input
            v-model="technical_requirements.storage"
            label="Место на жестком диске"
            dense
            filled
          ></q-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  data: {
    type: Object,
  },
});
const technical_requirements = ref({ ...props.data });
watch(
  () => props.data,

  (newVal) => {
    if (newVal !== technical_requirements.value) {
      technical_requirements.value = newVal;
    }
  },
  { deep: true }
);

watch(technical_requirements.value, (newVal) => {
  emit("update:modelValue", newVal);
  console.log("изменение");
});
</script>
<style lang=""></style>
