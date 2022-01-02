<template>
    <article class='bg-white text-blue-955 dark:bg-blue-950 dark:text-white shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-xl'>

      <img class='object-cover md:w-[365px] md:h-[256px] float-left' :src="flag" :alt="name" />

      <div class='h-1/2 px-5 pb-12 pt-5 clear-left'>
        <h2 class='font-bold text-lg mb-3'>{{ name }}</h2>
        <div class='text-sm'>
          <p><span class='font-semibold'>Population: </span> {{ population.toLocaleString() }}</p>
          <p><span class='font-semibold'>Region: </span> {{ region }} </p>
          <p><span class='font-semibold'>Capital: </span> {{ capital[0] }} </p>
        </div>
      </div>
    </article>
</template>

<script setup>

defineProps({
  name: String,
  population: Number,
  region: String,
  capital:{
    type: Array,
    default: () => ['']
  },
  flag: String
})

</script>