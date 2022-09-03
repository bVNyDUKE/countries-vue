import { ref } from 'vue'
import axios from 'axios'

export default function useApi() {
  const data = ref([])

  const getData = async (endpoint) => {
    const response = await axios.get(`${endpoint}`)
    data.value = response.data
  }

  return {
    data,
    getData,
  }
}
