import { reactive, readonly, ref } from 'vue'
import useApi from './useApi'

const store = reactive({
  countries: []
})

export default function useStore() {
  const { data, getData } = useApi()
  const loading = ref(false)

  const getCountries = async () => {
    loading.value = true
    await getData('https://restcountries.com/v3.1/all')
    loading.value = false
    store.countries = data
  }

  const getCountryByCode = (code) => {
    return store.countries.find(country => country.cca3 === code)
  }

  return {
    store: readonly(store),
    loading,
    getCountries,
    getCountryByCode
  }
}
