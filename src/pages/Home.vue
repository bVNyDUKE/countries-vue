<template>
  <div>
    <div
      class="lg:flex px-5 sm:px-0 justify-between items-center mt-10 container m-auto space-y-10 lg:space-y-0"
    >
      <SearchBar />
      <RegionSelection />
    </div>

    <div
      v-if="loading"
      class="grid px-10 sm:px-0 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 items-stretch mt-10 container m-auto text-blue-960 dark:text-white"
    >Loading...</div>
    <div
      v-if="filtered"
      class="grid px-10 sm:px-0 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 items-stretch mt-10 container m-auto text-blue-960 dark:text-white"
    >
      <Card
        v-for="c in filtered"
        :key="c.ccn3"
        :flag="c.flags.svg"
        :name="c.name.official"
        :capital="c.capital"
        :population="c.population"
        :region="c.region"
        @click="router.push(`/${c.cca3}`)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import SearchBar from '../components/SearchBar.vue'
import Card from '../components/Card.vue'
import RegionSelection from '../components/RegionSelection.vue'

import useFilters from '../composables/useFilters'
import useStore from '../composables/useStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { filters } = useFilters()
const { store, loading } = useStore()

const filtered = computed(() => {
  let withFilter = filters.search === '' ? store.countries : store.countries.filter(country => country.name.official.toLowerCase().includes(filters.search.toLowerCase()))
  return withFilter = filters.region === '' ? withFilter : store.countries.filter(country => country.region === filters.region)
}
)


</script>
