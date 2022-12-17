<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { getAllCountries } from '../api'

import SearchBar from '../components/SearchBar.vue'
import RegionSelection from '../components/RegionSelection.vue'
import Card from '../components/Card.vue'
import CardLoader from '../components/CardLoader.vue'
import Paginator from '../components/Paginator.vue'

const router = useRouter()

const { isLoading, isError, data, error } = getAllCountries()

const filtered = computed(() => {
  if (isLoading.value) {
    return []
  }

  let withFilter =
    store.search === ''
      ? data.value
      : data.value?.filter((country) =>
        country.name.official
          .toLowerCase()
          .includes(store.search.toLowerCase())
      )

  withFilter =
    store.region === ''
      ? withFilter
      : withFilter.filter((country) => country.region === store.region)


  return withFilter
})

const total = computed(() => Math.ceil(filtered.value.length / 20))
const paginated = computed(() => {
  if (filtered.value.length <= 20){
    return filtered.value
  }

  const rangeFrom = (store.page - 1) * 20
  const rangeTo = store.page * 20
  return filtered.value.slice(rangeFrom, rangeTo)
})

</script>

<template>
  <div>
    <div
      class="lg:flex px-5 sm:px-0 justify-between items-center mt-10 container m-auto space-y-10 lg:space-y-0"
    >
      <SearchBar />
      <RegionSelection />
    </div>
    <div
      v-if="isLoading"
      class="card-grid"
    >
      <CardLoader
        v-for="i in 10"
        :key="i"
      />
    </div>

    <div
      v-if="isError"
      class="text-red-500"
    >
      Encountered an error: {{ error }}
    </div>
    <div
      v-else
      class="card-grid"
    >
      <Card
        v-for="c in paginated"
        :key="c.ccn3"
        :flag="c.flags.svg"
        :name="c.name.common"
        :capital="c.capital"
        :population="c.population"
        :region="c.region"
        @click="router.push(`/${c.cca3}`)"
      />
    </div>
    <Paginator
      v-if="total > 1"
      :total="total"
    />
  </div>
</template>

<style lang="postcss" scoped>
.card-grid {
  @apply grid px-10 sm:px-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10 m-auto container text-blue-960 dark:text-white items-start;
}
</style>
