<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCountryFromStore, getCountryFromApi } from '../store'
import CountryLoader from '../components/CountryLoader.vue'

const router = useRouter()
const route = useRoute()
const country = ref(null)
const error = ref(null)
const borders = ref(null)
const loading = ref(false)

watchEffect(async () => {
  if(route.params.country !== undefined){
    loading.value = true
    const { data, error: err } = await getCountryFromApi(route.params.country)
    country.value = data
    error.value = err

    if(country.value.borders){

      borders.value = await Promise.all(country.value.borders
        .map( async code => {
          const country = await getCountryFromStore(code)
          return { name: country.name.common, code: country.cca3 }
        }))
    }
    loading.value = false
  }
})

const currencies = computed(() => country?.value?.currencies?.reduce((prev, next) => [...prev, next.name], []).join(', '))
const languages = computed(() => country?.value?.languages?.reduce((prev, next) => [...prev, next.name], []).join(', '))
const domain = computed(() => country?.value?.topLevelDomain && country.value.topLevelDomain[0])

</script>

<template>
  <div class="container mx-auto mt-5 sm:mt-10 p-10 text-blue-955 dark:text-white">
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
      v-else-if="country"
      class="lg:flex lg:items-center lg:flex-col xl:flex-row xl:justify-start xl:space-x-10"
    >
      <img
        class="object-cover sm:w-[645px] sm:h-[465px] float-left"
        :src="country?.flag"
      >

      <div class="clear-left">
        <div class="space-y-10">
          <h1 class="text-3xl font-bold pt-10">
            {{ country?.name }}
          </h1>
          <div
            class="space-y-10 md:flex md:items-start md:justify-start md:space-x-10 md:space-y-0"
          >
            <div>
              <p>
                <span class="font-semibold">Native Name:</span>
                {{ country?.nativeName }}
              </p>
              <p>
                <span class="font-semibold">Population:</span>
                {{ country?.population }}
              </p>
              <p>
                <span class="font-semibold">Region:</span>
                {{ country?.region }}
              </p>
              <p>
                <span class="font-semibold">Sub Region:</span>
                {{ country?.region }}
              </p>
              <p>
                <span class="font-semibold">Capital:</span>
                {{ country?.capital || 'None' }}
              </p>
            </div>
            <div>
              <p>
                <span class="font-semibold">Top Level Domain:</span>
                {{ domain }}
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
    <div v-else>
      An error occured
    </div>
  </div>
</template>
