<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store";
import { getAllCountries } from "../api";

import SearchBar from "../components/SearchBar.vue";
import RegionSelection from "../components/RegionSelection.vue";
import Card from "../components/Card.vue";
import CardLoader from "../components/CardLoader.vue";
import Paginator from "../components/Paginator.vue";

const router = useRouter();
const total = ref(0);

const { isLoading, isError, data, error } = getAllCountries();

const countries = computed(() => {
  if (isLoading.value) {
    return [];
  }

  let withFilter =
    store.search === ""
      ? data.value
      : data.value?.filter((country) =>
          country.name.official
            .toLowerCase()
            .includes(store.search.toLowerCase())
        );

  withFilter =
    store.region === ""
      ? withFilter
      : withFilter.filter((country) => country.region === store.region);

  total.value = Math.ceil(withFilter.length / 20);

  if (withFilter.length > 20) {
    const rangeFrom = (store.page - 1) * 20;
    const rangeTo = store.page * 20;
    return withFilter.slice(rangeFrom, rangeTo);
  }

  return withFilter;
});
</script>

<template>
  <div>
    <div
      class="lg:flex px-5 sm:px-0 justify-between items-center mt-10 container m-auto space-y-10 lg:space-y-0"
    >
      <SearchBar />
      <RegionSelection />
    </div>
    <div v-if="isLoading" class="card-grid">
      <CardLoader v-for="i in 10" :key="i" />
    </div>

    <div v-if="isError" class="text-red-500">
      Encountered an error: {{ error }}
    </div>
    <div v-else class="card-grid">
      <Card
        v-for="c in countries"
        :key="c.ccn3"
        :flag="c.flags.svg"
        :name="c.name.common"
        :capital="c.capital"
        :population="c.population"
        :region="c.region"
        @click="router.push(`/${c.cca3}`)"
      />
    </div>
    <Paginator v-if="total > 1" :total="total" />
  </div>
</template>

<style lang="postcss" scoped>
.card-grid {
  @apply grid px-10 sm:px-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10 m-auto container text-blue-960 dark:text-white items-start;
}
</style>
