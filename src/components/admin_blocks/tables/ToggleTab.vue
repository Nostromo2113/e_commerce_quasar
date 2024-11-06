<template lang="">
  <q-tabs v-model="activeSection" outside-arrows mobile-arrows dense>
    <q-tab
      @click="toggleTab(firstTab)"
      :name="firstTab"
      :label="props.firstLabel"
    ></q-tab>
    <q-tab
      @click="toggleTab(secondTab)"
      :name="secondTab"
      active
      :label="props.secondLabel"
    ></q-tab>
  </q-tabs>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

const emit = defineEmits(["toggleTab"]);

const props = defineProps({
  firstTab: {
    type: String,
    default: "firstTab",
  },
  secondTab: {
    type: String,
    default: "secondTab",
  },

  firstLabel: {
    type: String,
    default: "first tab",
  },
  secondLabel: {
    type: String,
    default: "second tab",
  },
});

const firstTab = props.firstTab;
const secondTab = props.secondTab;
const activeSection = ref(props.firstTab);

const toggleTab = (tab) => {
  console.log(tab);
  activeSection.value = tab;
  emit("toggleTab", tab);
};
</script>
<style lang=""></style>
