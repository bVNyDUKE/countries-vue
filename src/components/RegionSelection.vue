<template>
  <div class="w-1/2 lg:w-1/6 relative hover:cursor-pointer text-sm">
    <div
      ref="trigger"
      class="flex justify-between items-center rounded-md shadow-md h-16 px-5 bg-white text-blue-955 dark:bg-blue-950 dark:text-white"
    >
      <span
        class="whitespace-nowrap flex-grow"
      >{{ selected === '' ? 'Filter by Region' : selected }}</span>
      <svg
        v-if="selected === ''"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="{2}"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="{2}"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div
      v-show="show"
      ref="node"
      class="bg-white dark:bg-blue-950 dark:text-white text-blue-960 p-6 absolute w-full mt-1 rounded-md shadow-md"
    >
      <ul class="space-y-3">
        <li
          v-for="region in regions"
          :key="{ region }"
          class="hover:underline"
          @click="() => dropdownClick(region)"
        >
          {{ region }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { filters } from '../store'

const regions = ['Africa', 'Americas', 'Asia', 'Antarctic', 'Europe', 'Oceania']
const show = ref(false)
const selected = ref('')
const trigger = ref(null)
const node = ref(null)

const handleClickOutside = event => {
  if (trigger.value.contains(event.target) && selected.value === '') {
    return show.value = !show.value
  }

  if (trigger.value.contains(event.target) && selected.value !== '') {
    dropdownClick('')
    return selected.value = ''
  }

  if (!node.value.contains(event.target)) {
    return show.value = false
  }
}

onMounted(() => {
  selected.value = filters.region
  document.addEventListener('click', handleClickOutside, true)
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside, true))

const dropdownClick = (region) => {
  selected.value = filters.region = region
  show.value = false
}

</script>
