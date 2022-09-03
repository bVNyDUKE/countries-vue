import { ref, reactive } from 'vue'
import axios from 'axios'

const store = {
  countries: []
}

export const filters = reactive({
  search: '',
  region: '',
})

export const getAllCountries = async () => {
  const error = ref(null)
  let data = []

  if (store.countries.length === 0) {
    try {
      const { data: resData } = await axios.get('https://restcountries.com/v3.1/all')
      data = store.countries = resData
    } catch (e) {
      error.value = e
    }
  } else {
    data = store.countries
  }

  return {
    data,
    error,
  }
}

export const getCountryFromApi = async (countryCode) => {
  const error = ref(null)
  let data = null

  try {
    const { data: resData } = await axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
    data = resData
  } catch (e) {
    error.value = e
  }

  return {
    data,
    error
  }
}

export const getCountryFromStore = async (countryCode) => {
  if (store.countries.length === 0) {
    await getAllCountries()
  }
  return store.countries.find(country => country.cca3 === countryCode)
}
