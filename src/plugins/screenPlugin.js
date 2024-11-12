import { ref, onMounted, onBeforeUnmount } from "vue";

export default function useScreenWidth() {
  const screenWidth = ref(window.innerWidth);

  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", updateScreenWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenWidth);
  });

  return { screenWidth };
}
