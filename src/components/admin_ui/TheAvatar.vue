<template>
  <div class="avatar-container">
    <img src="/images/pleasant-looking-cau.jpg" alt="Avatar" />
  </div>
</template>

<style>
.avatar-container {
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
  width: 120px; /* Ширина контейнера */
  height: 80px; /* Высота контейнера */
  border-radius: 20px; /* Делаем контейнер круглым */
  background-color: #f0f0f0; /* Цвет фона, если изображение меньше контейнера */
  overflow: hidden; /* Скрытие части изображения, если оно больше контейнера */
}

.avatar-container img {
  max-width: 100%; /* Ограничиваем ширину изображения */
  max-height: 100%; /* Ограничиваем высоту изображения */
  object-fit: contain; /* Уменьшаем изображение так, чтобы оно помещалось в контейнер */
}
</style>
