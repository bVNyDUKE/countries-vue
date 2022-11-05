<template>
  <main class="m-auto bg-grey-955 dark:bg-blue-955 min-h-screen">
    <NavBar />

    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

main,
article,
div,
p,
nav,
input,
span,
button {
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 1000ms;
}
</style>
