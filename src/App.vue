<template>
  <main class='m-auto bg-grey-955 dark:bg-blue-955 min-h-screen'>
    <NavBar />

     <div class='lg:flex px-5 sm:px-0 justify-between items-center mt-10 container m-auto space-y-10 lg:space-y-0'>
       <SearchBar />
       <RegionSelection />
     </div>

      <div v-if="loading" class='grid px-10 sm:px-0 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 items-stretch mt-10 container m-auto text-blue-960 dark:text-white '>
        Loading...
      </div>
      <div v-if="filtered" class='grid px-10 sm:px-0 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 items-stretch mt-10 container m-auto text-blue-960 dark:text-white '>
        <Card
          v-for="c in filtered"
          :key="c.ccn3"
          :flag="c.flags.png"
          :name="c.name.official"
          :capital="c.capital"
          :population="c.population"
          :region="c.region" />
      </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import NavBar from './components/NavBar.vue'
import SearchBar from './components/SearchBar.vue'
import Card from './components/Card.vue'
import RegionSelection from './components/RegionSelection.vue'

import useCountries from './composables/useCountries'
import useFilters from './composables/useFilters'

const { countries, loading, getCountries } = useCountries()
const { filters } = useFilters()

onMounted(getCountries)

const filtered = computed(() => {
  let data = filters.search === '' ? countries.value : countries.value.filter(country => country.name.official.toLowerCase().includes(filters.search.toLowerCase()))
  return data = filters.region === '' ? data : countries.value.filter(country => country.region === filters.region)
}
)


</script>