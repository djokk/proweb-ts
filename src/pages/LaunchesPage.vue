<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
// import { useCategoryStore } from '@/stores/category'
import { useLaunchStore } from '@/stores/launch'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Loading from '@/components/Loading.vue'
import CategoryList from '@/components/CategoryList.vue'
import LaunchBoard from '@/components/LaunchBoard.vue'

// const categoryStore = useCategoryStore()
const launchStore = useLaunchStore()

onMounted(() => {
  // launchStore.fetchCategories()
  launchStore.init()
})

function updateFilter(id: number | null) {
  launchStore.setFilter(id)
}
</script>

<template>
  <section class="launches-page">
    <Breadcrumbs message="Запуски" />
    <Loading v-if="launchStore.loading || launchStore.loading" />
    <CategoryList :categories="launchStore.categories" :selected="launchStore.filterId"
      @update:selected="updateFilter" />
    <LaunchBoard />
  </section>
</template>

<style scoped lang="scss">
.launches-page {
  height: 100%;
  position: relative;
}
</style>