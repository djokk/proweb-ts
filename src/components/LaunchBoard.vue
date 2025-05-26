<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
// import { useCategoryStore } from '@/stores/category'
import { useLaunchStore } from '@/stores/launch'

// const categoryStore = useCategoryStore()
const launchStore = useLaunchStore()
const isCtrlPressed = ref(false)

interface Group {
  id: number
  start_date: string
  study_time: string
  days: number[]
  date?: string
}

const filteredCourses = computed(() => {
  if (!launchStore.filterId) return launchStore.courses
  return launchStore.courses.filter((course) =>
    course.categories?.some((cat: { id: number }) => cat.id === launchStore.filterId)
  )
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getWeekday(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase()
}

function getWeekdays(days: number[]) {
  const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  return days.map(d => weekdays[d]).join(', ')
}

const dragData = ref<any | null>(null)

function handleDrop(targetCourse: any) {
  if (!dragData.value || dragData.value.id === targetCourse.id) return
  const draggedIndex = launchStore.courses.findIndex(c => c.id === dragData.value.id)
  const targetIndex = launchStore.courses.findIndex(c => c.id === targetCourse.id)
  if (draggedIndex > -1 && targetIndex > -1) {
    const updated = [...launchStore.courses]
    const [moved] = updated.splice(draggedIndex, 1)
    updated.splice(targetIndex, 0, moved)
    launchStore.courses = updated
  }
}

function groupLessonsByDate(items: any[], reverse = false) {
  const map = new Map<string, string[]>()

  for (const item of items) {
    const date = item.start_date || item.date
    const time = item.study_time || item.time
    if (!map.has(date)) map.set(date, [])
    map.get(date)!.push(time)
  }

  return Array.from(map.entries())
    .map(([date, times]) => ({
      date,
      times: times.sort() // сортировка времени от раннего к позднему
    }))
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime()
      return reverse ? -diff : diff
    })
}


onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Control') isCtrlPressed.value = true
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') isCtrlPressed.value = false
  }

  const handleWheel = (e: Event) => {
    if (isCtrlPressed.value) {
      e.preventDefault()
      const el = e.currentTarget as HTMLElement
      el.scrollLeft += (e as WheelEvent).deltaY
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  const el = document.querySelector('.kanban-board') as HTMLElement | null
  el?.addEventListener('wheel', handleWheel, { passive: false })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    el?.removeEventListener('wheel', handleWheel)
  })
})

</script>

<template>
  <div class="kanban-container">
    <div class="kanban-board">
      <div v-for="course in filteredCourses" :key="course.id" class="kanban-board__column" draggable="true"
        @dragstart="() => (dragData = course)" @dragover.prevent @drop="() => handleDrop(course)">

        <div class="kanban-board__course-content course-content">
          <p class="course-content__title">{{ course.name }}</p>
          <p class="course-content__category-badge" :style="{ backgroundColor: course.categories[0]?.color }">
            {{ course.categories[0]?.name }}
          </p>
        </div>

        <div class="kanban-board__kanban-content kanban-content">
          <div class="kanban-content__block">
            <h4 class="kanban-content__title">Старт групп</h4>
            <div class="kanban-content__group-date group-date"
              v-for="(groupDate, index) in groupLessonsByDate(course.groups)" :key="index">
              <p class="group-date__lesson-date">
                {{ formatDate(groupDate.date) }}<span> {{getWeekdays(course.groups.find((g: Group) => g.start_date ===
                  groupDate.date)?.days || [])}}</span>
              </p>
              <div class="group-date__time">
                <p v-for="time in groupDate.times" :key="time" class="group-date__time-cell">
                  {{ time.slice(0, 5) }}
                </p>
              </div>
            </div>
          </div>

          <div class="kanban-content__block lesson">
            <h4 class="kanban-content__title">Открытые уроки</h4>
            <div class="kanban-content__group-date group-date"
              v-for="(lessonGroup, index) in groupLessonsByDate(course.open_lessons, true)" :key="index">
              <p class="group-date__lesson-date">
                {{ formatDate(lessonGroup.date) }} <span>{{ getWeekday(lessonGroup.date) }}</span>
              </p>
              <div class="group-date__time">
                <p v-for="time in lessonGroup.times" :key="time" class="group-date__time-cell">
                  {{ time.slice(0, 5) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kanban-container {
  overflow: auto;
  padding: 1.25rem;
  -webkit-overflow-scrolling: touch;
}

.kanban-board {
  display: flex;
  gap: 0.938rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  // scroll-snap-type: x mandatory;
  scroll-snap-type: none;

  &__column {
    width: 21.875rem;
    display: flex;
    flex-direction: column;
    background: #f9f8f4;
    // padding: 1rem;
    border-radius: 12px;
    flex-shrink: 0;
    scroll-snap-align: start;
    gap: 0.625rem;

    .course-content {
      display: flex;
      align-items: center;
      padding-left: 0.625rem;

      &__title {
        font-weight: 500;
        font-size: 1rem;
        color: #606060;
        margin-right: 0.625rem;
        white-space: nowrap;
      }

      &__category-badge {
        display: inline-block;
        font-size: 0.75rem;
        line-height: 0.625rem;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0.25rem 0.438rem;
        border-radius: 999px;
      }
    }

    .kanban-content {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background: #fff;
      overflow: hidden;

      &__block {
        display: flex;
        flex-direction: column;
        padding: 0.938rem;
        gap: 0.625rem;

        &:nth-last-child(1) {
          background: #f2efe4;
        }
      }

      &__title {
        font-size: 1rem;
        font-weight: 500;
        color: #000;
      }

      .group-date {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        &__date {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 500;
          color: #616161;
          margin-bottom: 0.625rem;
        }

        &__lesson-date {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 500;
          color: #616161;
          margin-bottom: 0.625rem;
        }

        &__time {
          background: #F9FAF5;
          border: 1px solid #F0F0F0;
          border-radius: 1.25rem;
        }

        &__time-cell {
          // background: #fff;
          // border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          color: #383838;
          text-align: left;
          border-bottom: 1px solid #F0F0F0;
          padding: 0.625rem;

          // box-shadow: 0 0 0 1px #eee;
          &:nth-last-child(1) {
            border-bottom: none;
          }
        }
      }
    }
  }
}



// .group-date,
// .lesson-date {
//   font-size: 14px;
//   font-weight: 500;
//   color: #333;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 0.25rem;
// }

// .time-cell {
//   background: #fff;
//   border-radius: 8px;
//   padding: 6px 12px;
//   font-size: 14px;
//   color: #000;
//   text-align: center;
//   box-shadow: 0 0 0 1px #eee;
// }

@media (max-width: 768px) {
  .kanban-board__column {
    width: 240px;
  }
}
</style>
