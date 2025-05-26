<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';

</script>

<template>
  <section class="about-page">
    <Breadcrumbs message="Обо мне" />
    <div class="profile">
      <img src="../assets/profil.jpg" alt="Фото" />
      <div class="info">
        <h2 class="info__title">Мансуров Жахонгир Улугбек угли</h2>
        <p class="info__subtitle">28 лет | 15 сентябрь 1996 год</p>
        <p class="info__subtitle">г. Ташкент, Янгихаётский рн. </p>
      </div>
    </div>
    <div class="details">
      <h3 class="details__title">Информация</h3>
      <p class="details__subtitle">Меня зовут Жахонгир, и я — увлечённый энтузиаст технологий и современного
        программирования. С юных лет меня тянуло к компьютерам и созданию чего-то нового, и со временем эта увлечённость
        переросла в осознанный профессиональный путь. Я начал с изучения основ разработки и дизайна, и с каждым проектом
        становился всё более увлечён поиском эффективных решений и изучением новых инструментов.</p>
      <p class="details__subtitle">В свободное время я люблю читать книги о технологиях и саморазвитии, а также
        экспериментировать с новыми инструментами и фреймворками. Мне нравится прокачивать свои навыки через практику и
        мини-проекты — это помогает не только углубить знания, но и находить нестандартные решения для будущих задач.
      </p>
      <p class="details__subtitle">Моя цель — разрабатывать полезные, продуманные и надёжные цифровые продукты, которые
        делают жизнь людей проще и удобнее. Я всегда открыт новым идеям, командам и вызовам, ведь в каждом проекте я
        вижу возможность стать лучше.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-page {
  .profile {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    gap: 1.25rem;

    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      object-fit: cover;
    }

    .info {
      &__title {
        font-size: 1.875rem;
        font-weight: 500;
        color: #000;
        margin-bottom: 0.625rem;
      }

      &__subtitle {
        font-size: 1.25rem;
        font-weight: 400;
        color: #000;
        margin-bottom: 0.313rem;
      }
    }
  }

  .details {
    padding: 1.25rem;

    &__title {
      font-size: 1.625rem;
      font-weight: 500;
      color: #000;
      margin-bottom: 1.25rem;
    }

    &__subtitle {
      font-size: 1.25rem;
      font-weight: 400;
      color: #000;
      margin-bottom: 1.25rem;
    }
  }
}
</style>