<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ categories: any[]; selected: number | null }>()
const emit = defineEmits(['update:selected'])

function toggle(id: number) {
  emit('update:selected', props.selected === id ? null : id)
}

function isLight(hex: string): boolean {
  const c = hex.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b
  return brightness > 186
}
</script>

<template>
  <div class="category-list">
    <p class="category-list__title">Категории</p>
    <div class="category-list__list">
      <p
        v-for="category in categories"
        :key="category.id"
        :style="category.id === selected
          ? { backgroundColor: category.color, color: isLight(category.color) ? '#000' : '#fff' }
          : {}"
        :class="['category-list__title-item', { active: category.id === selected }]"
        @click="toggle(category.id)"
      >
        {{ category.name }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-list {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 1.25rem;
  border-bottom: 1px solid #CCCCCC;

  &__title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-right: 1rem;
    color: #000;

    &-item {
      cursor: pointer;
      white-space: nowrap;
      background: #EDEDED;
      padding: 0.5rem 0.75rem;
      border-radius: 50px;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .active {
    font-weight: bold;
  }
}
</style>