<template lang="">
  <q-card class="q-pa-sm" flat bordered>
    <div class="q-py-md">
      <SearchForm @getSearchItems="getComments" />
    </div>
    <div class="grid-container">
      <div v-for="comment in comments" :key="comment.id">
        <q-card flat bordered>
          <q-card-section>
            <div class="row justify-between items-center">
              <div>
                <div class="text-h6">{{ comment.user_name }}</div>
                <div class="text-subtitle2">{{ comment.product_title }}</div>
              </div>
              <div>
                <p>{{ comment.created_at }}</p>
              </div>
            </div>
            <q-separator></q-separator>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div v-if="showTextArea !== comment.id">
              {{ comment.content }}
            </div>
            <q-input
              v-if="showTextArea === comment.id"
              type="textarea"
              v-model="comment.content"
            ></q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              v-if="showTextArea !== comment.id"
              @click="showTextArea = comment.id"
              color="secondary"
              >Редактировать</q-btn
            >
            <q-btn
              v-if="showTextArea === comment.id"
              @click="(showTextArea = null), updateComment(comment)"
              color="secondary"
              >Применить</q-btn
            >
            <q-btn color="negative">Удалить</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import SearchForm from "./forms/SearchForm.vue";
import { updateData } from "src/utils/crud/update";

const emit = defineEmits(["getComments"]);

const props = defineProps({
  comments: {
    type: Array,
  },
});

const showTextArea = ref(null);

const comments = ref(props.comments);

const getComments = (query) => {
  emit("getComments", query);
};

const updateComment = async (comment) => {
  console.log(comment);
  const response = await updateData(`comments/${comment.id}`, comment);
  console.log(response);
};

watch(
  () => props.comments,
  (newValue) => {
    comments.value = newValue;
  }
);
</script>
<style lang=""></style>
