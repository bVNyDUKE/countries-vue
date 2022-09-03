import { ref } from 'vue'
import axios from 'axios'

const store = {
  countries: []
}


export const getAllCountries = async () => {
  const error = ref(null)
  const data = ref(null)

  if (store.countries.length === 0) {
    try {
      const { data: resData } = await axios.get('https://restcountries.com/v3.1/all')
      data.value = store.countries = resData
    } catch (e) {
      error.value = e
    }
  } else {
    data.value = store.countries
  }

  return {
    data,
    error,
  }
}

export const getCountryFromApi = (countryCode) => {
  const loading = ref(true)
  const data = ref(null)

  axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
    .then(res => data.value = res.data)
    .then(loading.value = false)

  return {
    data,
    loading
  }
}

export const getCountryFromStore = (countryCode) => {
  return store.countries.find(country => country.cca3 === countryCode)
}
