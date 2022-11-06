<script setup>
import { store } from "../store";

const { total } = defineProps(["total"]);

const prevPage = () => store.page !== 1 && store.page--;
const nextPage = () => store.page !== total && store.page++;
const firstPage = () => (store.page = 1);
const lastPage = () => (store.page = total);
</script>

<style lang="postcss" scoped>
.button {
  @apply flex justify-between items-center rounded-md shadow-md h-16 px-5 bg-white text-blue-955 dark:bg-blue-950 dark:text-white;
}
</style>

<template>
  <div class="p-10 m-auto container flex justify-between">
    <button class="button" @click="firstPage" :disabled="store.page === 1">
      &lt;&lt;
    </button>
    <button class="button" @click="prevPage" :disabled="store.page === 1">
      &lt;
    </button>
    <div class="button">page {{ store.page }} of {{ total }}</div>
    <button class="button" @click="nextPage" :disabled="store.page === total">
      &gt;
    </button>
    <button class="button" @click="lastPage" :disabled="store.page === total">
      &gt;&gt;
    </button>
  </div>
</template>
