// stores/launch.ts
import { defineStore } from 'pinia'

interface Category {
  id: number
  name: string
}

export const useLaunchStore = defineStore('launch', {
  state: () => ({
    courses: [] as any[],
    categories: [] as Category[],
    loading: false,
    loaded: false,
    filterId: null as number | null,
  }),

  getters: {
    filteredCourses(state): any[] {
      if (!state.filterId) return state.courses
      return state.courses.filter((course) =>
        course.categories?.some((cat: Category) => cat.id === state.filterId)
      )
    },

    filteredCategories(state): Category[] {
      return state.categories
    },
  },

  actions: {
    async init() {
      if (this.loaded || this.loading) return
      await this.fetch()
    },

    async fetch() {
      this.loading = true
      try {
        const res = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/')
        const data = await res.json()
        this.courses = data.results

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
        this.loaded = true
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      } finally {
        this.loading = false
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
