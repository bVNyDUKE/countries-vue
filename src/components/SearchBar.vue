<template>
  <div
    class="bg-white dark:bg-blue-950 min-w-min w-full lg:w-1/3 h-16 flex items-center space-x-8 rounded-md shadow-md text-gray-950 dark:text-white"
  >
    <div class="ml-8">
      <svg
        v-if="searching"
        class="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <svg
        v-if="!searching"
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="{2}"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <input
      id="search"
      v-model="searchInput"
      type="text"
      name="search"
      placeholder="Search for a country..."
      class="flex-grow focus:outline-none dark:bg-blue-950 text-grey-950 dark:text-white"
    />
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { store } from "../store";

const searching = ref(false);
const searchInput = ref("");

onMounted(() => (searchInput.value = store.search));

let timeout;
watch(searchInput, () => {
  clearTimeout(timeout);
  searching.value = true;
  timeout = setTimeout(() => {
    searching.value = false;
    store.search = searchInput.value;
  }, 500);
});
</script>
