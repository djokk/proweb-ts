<template>
  <div class="app">
    <SidebarMenu />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>

<style lang="scss">
body {
  font-family: 'Inter', sans-serif;
  background: #F9FAF5;
  margin: 0;
}

p,
h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}

.app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  overflow: auto;
  padding: 1.25rem 0;
}
</style>
