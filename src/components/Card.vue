<template>
  <article
    class="bg-white text-blue-955 dark:bg-blue-950 dark:text-white shadow-md rounded-md overflow-hidden hover:cursor-pointer hover:shadow-xl"
  >
    <div class="md:w[364px] md:h[236px]">
      <img
        class="object-cover aspect-[2/3] md:w-[364px] md:h-[236px]"
        :src="flag"
        :alt="name"
      >
    </div>

    <div class="px-5 pb-8">
      <h2 class="font-bold text-lg mt-7">
        {{ name }}
      </h2>
      <div class="text-sm">
        <p><span class="font-semibold">Population: </span> {{ population.toLocaleString() }}</p>
        <p><span class="font-semibold">Region: </span> {{ region }} </p>
        <p><span class="font-semibold">Capital: </span> {{ capital[0] }} </p>
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
