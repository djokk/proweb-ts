import { defineStore } from 'pinia'

interface Category {
  id: number
  name: string
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    filterId: null as number | null,
  }),

  getters: {
    filteredCategories(state) {
      return state.categories // фильтрация по клику отдельная
    },
  },

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const res = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/')
        const data = await res.json()

        // Собираем все категории из всех results
        const allCategories = data.results.flatMap(
          (item: { categories: Category[] }) => item.categories,
        )

        // Удаляем дубликаты по id
        const uniqueCategoriesMap = new Map<number, Category>()
        allCategories.forEach((cat: Category) => {
          uniqueCategoriesMap.set(cat.id, cat)
        })

        this.categories = Array.from(uniqueCategoriesMap.values())
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err)
      } finally {
        this.loading = false
        // setTimeout(() => {
        // }, 2000)
      }
    },

    setFilter(id: number | null) {
      this.filterId = this.filterId === id ? null : id
    },

    resetStore() {
      this.$reset()
    },
  },
})
