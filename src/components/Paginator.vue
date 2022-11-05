<script setup>
defineProps({
  page: Number,
  total: Number,
});

defineEmits(["nextPage", "prevPage", "firstPage", "lastPage"]);
</script>

<style lang="postcss" scoped>
.button {
  @apply flex justify-between items-center rounded-md shadow-md h-16 px-5 bg-white text-blue-955 dark:bg-blue-950 dark:text-white;
}
</style>

<template>
  <div class="p-10 m-auto container flex justify-between">
    <button class="button" @click="$emit('firstPage')" :disabled="page === 1">
      &lt;&lt;
    </button>
    <button class="button" @click="$emit('prevPage')" :disabled="page === 1">
      &lt;
    </button>
    <div class="button">page {{ page }} of {{ total }}</div>
    <button
      class="button"
      @click="$emit('nextPage')"
      :disabled="page === total"
    >
      &gt;
    </button>
    <button
      class="button"
      @click="$emit('lastPage')"
      :disabled="page === total"
    >
      &gt;&gt;
    </button>
  </div>
</template>
