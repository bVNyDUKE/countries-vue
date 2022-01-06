import { reactive } from 'vue'
import useApi from './useApi'

const store = reactive({
  countries: []
})

export default function useStore(){
  const { data, loading, getData } = useApi()

  const getCountries = () => {
    getData('https://restcountries.com/v3.1/all')
    store.countries = data
  }

  const getCountryByCode = (code) => {
    return store.countries.filter(country => country.cca3 === code)
  }

  return {
    store,
    loading,
    getCountries,
    getCountryByCode
  }
}