import { ref } from 'vue'
import axios from 'axios'

export default function useCountries(){
  const countries = ref([])
  const loading = ref(false)

  const getCountries = async () => {
    loading.value = true
    const response = await axios.get('https://restcountries.com/v3.1/all')
    countries.value = response.data
    loading.value = false
  }

  return{
    countries,
    getCountries,
    loading
  }
}