<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useApi from '../composables/useApi'
import useStore from '../composables/useStore'
import CountryLoader from '../components/CountryLoader.vue'

const { data: country, loading, getData } = useApi()
const { getCountryByCode } = useStore()

const router = useRouter()
const route = useRoute()

getData(`https://restcountries.com/v2/alpha/${route.params.country}`)
watch(route, () => route.params.country !== undefined && getData(`https://restcountries.com/v2/alpha/${route.params.country}`))

const name = computed(() => country.value && country.value.name)
const nativeName = computed(() => !!country.value.nativeName && country.value.nativeName)
const region = computed(() => !!country.value.region && country.value.region)
const subregion = computed(() => !!country.value.subregion && country.value.subregion)
const capital = computed(() => !!country.value.capital && country.value.capital || 'None')
const population = computed(() => !!country.value.population && country.value.population.toLocaleString())
const topLevelDomain = computed(() => !!country.value.topLevelDomain && country.value.topLevelDomain[0])
const currencies = computed(() => !!country.value.currencies && country.value.currencies.reduce((prev, next) => [...prev, next.name], []).join(', '))
const languages = computed(() => !!country.value.languages && country.value.languages.reduce((prev, next) => [...prev, next.name], []).join(', '))
const flag = computed(() => !!country.value.flags && country.value.flags.svg)

const borders = computed(() =>
  !!country.value.borders &&
  country.value.borders
    .map( code => getCountryByCode(code))
    .map( country =>  !!country && { name: country.name.common, code: country.cca3 } )
)

</script>

<template>
  <div class="container m-auto mt-5 sm:mt-10 p-10 text-blue-955 dark:text-white">
    <div class="mb-20">
      <button
        class="flex justify-center items-center bg-white text-blue-955 dark:bg-blue-950 dark:text-gray-400 w-32 p-2 space-x-2 rounded-sm shadow-2xl"
        @click="router.back()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-955 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="{2}"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <div class="font-semibold">
          Back
        </div>
      </button>
    </div>
    <div v-if="loading">
      <CountryLoader />
    </div>
    <div
      v-if="!loading"
      class="lg:flex lg:justify-start lg:space-x-10"
    >
      <img
        class="object-cover sm:w-[645px] sm:h-[465px] float-left"
        :src="flag"
      >

      <div class="clear-left">
        <div class="space-y-10">
          <h1 class="text-3xl font-bold pt-10">
            {{ name }}
          </h1>
          <div
            class="space-y-10 lg:flex lg:items-start lg:justify-start lg:space-x-10 lg:space-y-0"
          >
            <div>
              <p>
                <span class="font-semibold">Native Name:</span>
                {{ nativeName }}
              </p>
              <p>
                <span class="font-semibold">Population:</span>
                {{ population }}
              </p>
              <p>
                <span class="font-semibold">Region:</span>
                {{ region }}
              </p>
              <p>
                <span class="font-semibold">Sub Region:</span>
                {{ subregion }}
              </p>
              <p>
                <span class="font-semibold">Capital:</span>
                {{ capital }}
              </p>
            </div>
            <div>
              <p>
                <span class="font-semibold">Top Level Domain:</span>
                {{ topLevelDomain }}
              </p>
              <p>
                <span class="font-semibold">Currencies:</span>
                {{ currencies }}
              </p>
              <p>
                <span class="font-semibold">Languages:</span>
                {{ languages }}
              </p>
            </div>
          </div>
          <div class="w-62 space-y-5">
            <span class="inline-block text-xl font-bold mr-5">Border Countries:</span>
            <span
              v-for="border in borders"
              :key="border"
              class="inline-block place-content-center bg-white text-blue-955 dark:bg-blue-950 dark:text-gray-400 px-8 p-2 mx-2 rounded-sm shadow-2xl hover:cursor-pointer"
              @click="router.push({name: 'Country', params: {country:border.code}})"
            >{{ border.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
