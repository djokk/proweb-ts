<script setup>
defineProps({
  message: String
})
</script>

<template>
  <div class="breadcrumbs">
    <p class="breadcrumbs__title">{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  padding: 1.25rem;
  border-bottom: 1px solid #CCCCCC;

  &__title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #000;
    margin: 0;
  }
}
</style>