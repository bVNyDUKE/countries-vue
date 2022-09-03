<template>
  <nav class="p-6 bg-white dark:bg-blue-950 dark:text-white">
    <div class="flex justify-between items-center container m-auto">
      <h1 class="text-xl font-bold text-blue-955 dark:text-white">
        Where in the world?
      </h1>
      <div class="flex font-semibold justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-3 hover:cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="toggleDarkMode"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        Dark Mode
      </div>
    </div>
  </nav>
</template>

<script setup>
const toggleDarkMode = () => {
  let root = document.documentElement.classList
  if(root.contains('dark')){
    root.remove('dark')
  }else{
    root.add('dark')
  }
}
</script>
